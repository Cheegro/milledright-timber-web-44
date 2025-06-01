
import { supabase } from '@/integrations/supabase/client'

export type EntityType = 'products' | 'projects' | 'blog_posts' | 'gallery_images'

export interface OptimizedImageUrls {
  optimized: string | null
  optimizedWebp: string | null
  thumbnail: string | null
  thumbnailWebp: string | null
}

export async function uploadAndOptimizeImage(
  file: File,
  entityType: EntityType,
  entityId: string
): Promise<OptimizedImageUrls> {
  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${entityType}_${entityId}_${timestamp}.${fileExtension}`
    const bucketPath = `${entityType}/${fileName}`

    console.log(`Uploading image to unprocessed bucket: ${fileName}`)

    // Upload to unprocessed-images bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('unprocessed-images')
      .upload(bucketPath, file)

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    console.log(`Image uploaded, triggering optimization...`)

    // Trigger the optimization function
    const { data: optimizationResult, error: optimizationError } = await supabase.functions
      .invoke('optimize-image', {
        body: {
          bucketPath: uploadData.path,
          entityType,
          entityId,
          originalFileName: fileName
        }
      })

    if (optimizationError) {
      throw new Error(`Optimization failed: ${optimizationError.message}`)
    }

    if (!optimizationResult.success) {
      throw new Error(`Optimization failed: ${optimizationResult.error}`)
    }

    console.log(`Image optimization completed successfully`)

    return optimizationResult.urls
  } catch (error) {
    console.error('Image upload and optimization error:', error)
    throw error
  }
}

export function getOptimizedImageUrl(
  optimizedUrl: string | null,
  fallbackUrl: string | null
): string | null {
  return optimizedUrl || fallbackUrl
}

export function getThumbnailUrl(
  thumbnailUrl: string | null,
  optimizedUrl: string | null,
  fallbackUrl: string | null
): string | null {
  return thumbnailUrl || optimizedUrl || fallbackUrl
}
