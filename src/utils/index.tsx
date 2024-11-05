export const lowerCapitalize = (string: string) => {
  if (string.length === 0) return string

  return string
    .split(' ')
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
