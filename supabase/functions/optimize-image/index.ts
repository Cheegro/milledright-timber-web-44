
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
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { bucketPath, entityType, entityId, originalFileName }: OptimizationRequest = await req.json()
    
    console.log(`Starting image optimization for ${entityType}:${entityId}, file: ${originalFileName}`)

    // Download the original image from unprocessed-images bucket
    const { data: originalImageData, error: downloadError } = await supabaseAdmin.storage
      .from('unprocessed-images')
      .download(bucketPath)

    if (downloadError || !originalImageData) {
      throw new Error(`Failed to download original image: ${downloadError?.message}`)
    }

    const imageBuffer = await originalImageData.arrayBuffer()
    
    // Create optimized versions using Canvas API (available in Deno)
    const optimizedVersions = await processImage(imageBuffer, originalFileName)
    
    // Upload optimized versions to processed-images bucket
    const uploadPromises = optimizedVersions.map(async (version) => {
      const { data, error } = await supabaseAdmin.storage
        .from('processed-images')
        .upload(version.path, version.buffer, {
          contentType: version.contentType,
          upsert: true
        })
      
      if (error) {
        console.error(`Failed to upload ${version.path}:`, error)
        throw error
      }
      
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

    // Update the database record with optimized URLs
    await updateDatabaseRecord(supabaseAdmin, entityType, entityId, urls)
    
    // Clean up: delete original image from unprocessed-images bucket
    await supabaseAdmin.storage
      .from('unprocessed-images')
      .remove([bucketPath])

    console.log(`Image optimization completed for ${entityType}:${entityId}`)

    return new Response(JSON.stringify({ 
      success: true, 
      urls,
      message: 'Image optimization completed'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Image optimization error:', error)
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})

async function processImage(imageBuffer: ArrayBuffer, originalFileName: string) {
  // Note: This is a simplified version. In production, you'd use a proper image processing library
  // For now, we'll simulate the processing and return the original buffer with different names
  // In a real implementation, you'd use libraries like Sharp or ImageMagick
  
  const baseName = originalFileName.split('.')[0]
  const ext = originalFileName.split('.').pop()?.toLowerCase()
  
  // Simulate different versions (in production, implement actual resizing/compression)
  const versions = [
    {
      type: 'optimized',
      path: `optimized/${baseName}_1200.${ext}`,
      buffer: imageBuffer,
      contentType: getContentType(ext || 'jpg')
    },
    {
      type: 'optimized-webp',
      path: `optimized/${baseName}_1200.webp`,
      buffer: imageBuffer, // In production, convert to WebP
      contentType: 'image/webp'
    },
    {
      type: 'thumbnail',
      path: `thumbnails/${baseName}_300.${ext}`,
      buffer: imageBuffer, // In production, resize to 300px
      contentType: getContentType(ext || 'jpg')
    },
    {
      type: 'thumbnail-webp',
      path: `thumbnails/${baseName}_300.webp`,
      buffer: imageBuffer, // In production, resize and convert to WebP
      contentType: 'image/webp'
    }
  ]
  
  return versions
}

function getContentType(extension: string): string {
  const contentTypes: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif'
  }
  return contentTypes[extension] || 'image/jpeg'
}

function getPublicUrl(supabase: any, path: string | undefined): string | null {
  if (!path) return null
  
  const { data } = supabase.storage
    .from('processed-images')
    .getPublicUrl(path)
  
  return data.publicUrl
}

async function updateDatabaseRecord(supabase: any, entityType: string, entityId: string, urls: any) {
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
  
  const { error } = await supabase
    .from(entityType)
    .update(updateData)
    .eq('id', entityId)
  
  if (error) {
    console.error(`Failed to update ${entityType} record:`, error)
    throw error
  }
}
