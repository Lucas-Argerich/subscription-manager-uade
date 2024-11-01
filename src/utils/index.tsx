export const lowerCapitalize = (string: string) => {
  if (string.length === 0) return string
  
  const first = string.slice(0, 1).toUpperCase()
  const rest = string.slice(1).toLowerCase()

  return first + rest
}