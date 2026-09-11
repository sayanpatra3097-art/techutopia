/**
 * Cloudinary asset mapping and helper utilities
 */
import cloudinaryMap from '../assets/cloudinaryUrls.json'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 's9jvl8w0'
const BASE_CLOUDINARY_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto`

/**
 * Returns the Cloudinary URL for a given relative asset path,
 * with fallback to uploaded URL mapping or deterministic Cloudinary public URL.
 * 
 * @param {string} assetPath - Relative path like 'door.png', 'pastphotos/1.png', etc.
 * @param {string} localFallback - Local fallback import
 * @returns {string} Cloudinary URL or local fallback
 */
export function getAssetUrl(assetPath, localFallback = null) {
  // Normalize path
  const cleanPath = assetPath.replace(/^\.\//, '').replace(/^\/src\/assets\//, '').replace(/^assets\//, '')
  
  // 1. Check exact uploaded map
  if (cloudinaryMap && cloudinaryMap[cleanPath]) {
    return cloudinaryMap[cleanPath]
  }

  // 2. Deterministic Cloudinary URL schema
  const cleanWithoutExt = cleanPath.replace(/\.[^/.]+$/, '')
  const constructedUrl = `${BASE_CLOUDINARY_URL}/techuthopia/assets/${cleanWithoutExt}`

  // 3. Fallback to local import if provided and map not yet populated
  return localFallback || constructedUrl
}

export default getAssetUrl
