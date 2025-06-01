
import React from 'react'

interface OptimizedImageProps {
  src: string | null
  webpSrc?: string | null
  thumbnailSrc?: string | null
  thumbnailWebpSrc?: string | null
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  useThumbnail?: boolean
  sizes?: string
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  thumbnailSrc,
  thumbnailWebpSrc,
  alt,
  className = '',
  loading = 'lazy',
  useThumbnail = false,
  sizes
}) => {
  // Determine which images to use
  const mainSrc = useThumbnail ? (thumbnailSrc || src) : src
  const mainWebpSrc = useThumbnail ? (thumbnailWebpSrc || webpSrc) : webpSrc

  if (!mainSrc) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    )
  }

  return (
    <picture>
      {mainWebpSrc && (
        <source 
          srcSet={mainWebpSrc} 
          type="image/webp" 
          sizes={sizes}
        />
      )}
      <img
        src={mainSrc}
        alt={alt}
        className={className}
        loading={loading}
        sizes={sizes}
      />
    </picture>
  )
}

export default OptimizedImage
