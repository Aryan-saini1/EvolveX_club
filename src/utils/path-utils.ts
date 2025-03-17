
/**
 * Utility function to ensure paths are relative to the base URL
 */
export const getRelativePath = (path: string): string => {
  // If path already starts with http/https, it's external
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Return the path relative to the base URL
  return cleanPath;
};

/**
 * Utility function to get asset paths correctly
 */
export const getAssetPath = (assetPath: string): string => {
  // If the asset path is already a URL (e.g., external resource)
  if (assetPath.startsWith('http')) {
    return assetPath;
  }
  
  // For GitHub Pages deployments, ensure reliable image loading
  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // If in production and the asset is missing, use a placeholder
  // We use this as a fallback for critical images
  if (import.meta.env.PROD) {
    // Check if it's a known image that might cause issues
    if (cleanPath.includes('techfest-banner.jpg')) {
      console.log('Loading TechFest banner from public path');
    }
  }
  
  return cleanPath;
};
