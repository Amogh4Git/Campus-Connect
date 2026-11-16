/**
 * Resolves asset URLs correctly across Localhost, GitHub Pages (subpaths), Vercel, and Netlify.
 * Prevents leading slash from breaking subfolder deployments like username.github.io/repo/
 */
export function getAssetUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }

  // Remove leading slash or dot-slash
  let cleanPath = path
  if (cleanPath.startsWith('./')) {
    cleanPath = cleanPath.slice(2)
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1)
  }

  const base = import.meta.env.BASE_URL || './'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${cleanPath}`
}

