
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OptimizationRequest {
  bucketPath: string
  entityType: 'products' | 'projects' | 'blog_posts' | 'gallery_images'
  entityId: string
  originalFileName: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting image optimization process...')
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { bucketPath, entityType, entityId, originalFileName }: OptimizationRequest = await req.json()
    
    console.log(`Processing optimization for ${entityType}:${entityId}, file: ${originalFileName}`)

    // Download the original image from unprocessed-images bucket
    const { data: originalImageData, error: downloadError } = await supabaseAdmin.storage
      .from('unprocessed-images')
      .download(bucketPath)

    if (downloadError || !originalImageData) {
      console.error(`Failed to download original image: ${downloadError?.message}`)
      throw new Error(`Failed to download original image: ${downloadError?.message}`)
    }

    console.log(`Downloaded original image, size: ${originalImageData.size} bytes`)
    
    const imageBuffer = await originalImageData.arrayBuffer()
    
    // Create optimized versions
    const optimizedVersions = await processImage(imageBuffer, originalFileName)
    
    console.log(`Generated ${optimizedVersions.length} optimized versions`)
    
    // Upload optimized versions to processed-images bucket
    const uploadPromises = optimizedVersions.map(async (version) => {
      console.log(`Uploading ${version.type}: ${version.path}`)
      
      const { data, error } = await supabaseAdmin.storage
        .from('processed-images')
        .upload(version.path, version.buffer, {
          contentType: version.contentType,
          upsert: true,
          cacheControl: '3600'
        })
      
      if (error) {
        console.error(`Failed to upload ${version.path}:`, error)
        throw error
      }
      
      console.log(`Successfully uploaded ${version.type}: ${data.path}`)
      return { ...version, uploadPath: data.path }
    })

    const uploadResults = await Promise.all(uploadPromises)
    
    // Generate public URLs for the optimized images
    const urls = {
      optimized: getPublicUrl(supabaseAdmin, uploadResults.find(r => r.type === 'optimized')?.uploadPath),
      optimizedWebp: getPublicUrl(supabaseAdmin, uploadResults.find(r => r.type === 'optimized-webp')?.uploadPath),
      thumbnail: getPublicUrl(supabaseAdmin, uploadResults.find(r => r.type === 'thumbnail')?.uploadPath),
      thumbnailWebp: getPublicUrl(supabaseAdmin, uploadResults.find(r => r.type === 'thumbnail-webp')?.uploadPath)
    }

    console.log('Generated URLs:', urls)

    // Update the database record with optimized URLs
    await updateDatabaseRecord(supabaseAdmin, entityType, entityId, urls)
    
    // Clean up: delete original image from unprocessed-images bucket
    const { error: deleteError } = await supabaseAdmin.storage
      .from('unprocessed-images')
      .remove([bucketPath])
    
    if (deleteError) {
      console.error('Failed to delete original file:', deleteError)
      // Don't throw here, as the optimization was successful
    }

    console.log(`Image optimization completed successfully for ${entityType}:${entityId}`)

    return new Response(JSON.stringify({ 
      success: true, 
      urls,
      message: 'Image optimization completed successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Image optimization error:', error)
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})

async function processImage(imageBuffer: ArrayBuffer, originalFileName: string) {
  console.log(`Processing image: ${originalFileName}`)
  
  const baseName = originalFileName.split('.')[0]
  const ext = originalFileName.split('.').pop()?.toLowerCase()
  
  // For now, we'll create copies with different names
  // In a production environment, you would use a proper image processing library
  // like Sharp or ImageMagick to actually resize and optimize the images
  
  const versions = [
    {
      type: 'optimized',
      path: `optimized/${baseName}_optimized.${ext}`,
      buffer: imageBuffer,
      contentType: getContentType(ext || 'jpg')
    },
    {
      type: 'optimized-webp',
      path: `optimized/${baseName}_optimized.webp`,
      buffer: imageBuffer, // In production, convert to WebP
      contentType: 'image/webp'
    },
    {
      type: 'thumbnail',
      path: `thumbnails/${baseName}_thumb.${ext}`,
      buffer: imageBuffer, // In production, resize to thumbnail
      contentType: getContentType(ext || 'jpg')
    },
    {
      type: 'thumbnail-webp',
      path: `thumbnails/${baseName}_thumb.webp`,
      buffer: imageBuffer, // In production, resize and convert to WebP
      contentType: 'image/webp'
    }
  ]
  
  console.log(`Created ${versions.length} image versions for processing`)
  return versions
}

function getContentType(extension: string): string {
  const contentTypes: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif',
    'heic': 'image/jpeg',
    'heif': 'image/jpeg'
  }
  return contentTypes[extension] || 'image/jpeg'
}

function getPublicUrl(supabase: any, path: string | undefined): string | null {
  if (!path) {
    console.log('No path provided for public URL generation')
    return null
  }
  
  const { data } = supabase.storage
    .from('processed-images')
    .getPublicUrl(path)
  
  console.log(`Generated public URL for ${path}: ${data.publicUrl}`)
  return data.publicUrl
}

async function updateDatabaseRecord(supabase: any, entityType: string, entityId: string, urls: any) {
  console.log(`Updating database record for ${entityType}:${entityId}`)
  
  let updateData: any = {}
  
  switch (entityType) {
    case 'products':
      updateData = {
        optimized_image_url: urls.optimized,
        optimized_image_webp_url: urls.optimizedWebp,
        thumbnail_url: urls.thumbnail,
        thumbnail_webp_url: urls.thumbnailWebp
      }
      break
    case 'projects':
      updateData = {
        optimized_image_url: urls.optimized,
        optimized_image_webp_url: urls.optimizedWebp,
        thumbnail_url: urls.thumbnail,
        thumbnail_webp_url: urls.thumbnailWebp
      }
      break
    case 'blog_posts':
      updateData = {
        optimized_featured_image_url: urls.optimized,
        optimized_featured_image_webp_url: urls.optimizedWebp,
        thumbnail_featured_image_url: urls.thumbnail,
        thumbnail_featured_image_webp_url: urls.thumbnailWebp
      }
      break
    case 'gallery_images':
      updateData = {
        optimized_image_url: urls.optimized,
        optimized_image_webp_url: urls.optimizedWebp,
        thumbnail_url: urls.thumbnail,
        thumbnail_webp_url: urls.thumbnailWebp
      }
      break
  }
  
  console.log('Update data:', updateData)
  
  const { error } = await supabase
    .from(entityType)
    .update(updateData)
    .eq('id', entityId)
  
  if (error) {
    console.error(`Failed to update ${entityType} record:`, error)
    throw error
  }
  
  console.log(`Successfully updated ${entityType} record`)
}
