
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
  
  // Remove leading slash if present to ensure consistent paths
  const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // Handle image paths based on environment
  if (import.meta.env.PROD) {
    const basePath = "/EvolveX_club/";
    // In GitHub Pages, we need to handle the base path appropriately
    if (window.location.pathname.includes('/EvolveX_club/')) {
      // If image path doesn't include the base path, add it
      if (!cleanPath.includes(basePath) && !cleanPath.startsWith(basePath.substring(1))) {
        return `${cleanPath}`;
      }
    }
  }
  
  return cleanPath;
};
