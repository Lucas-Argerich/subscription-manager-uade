/**
  The boxShadow() function helps you to create a box shadow for an element
 */

// Material Dashboard 2 React helper functions
import rgba from '~assets/theme-dark/functions/rgba'
import pxToRem from '~assets/theme-dark/functions/pxToRem'

function boxShadow(
  offset: [number, number] = [0, 0], // Default to [0, 0] for [x, y] offset
  radius: [number, number] = [0, 0], // Default to [0, 0] for [blur, spread]
  color: string, // Color as a string
  opacity: number, // Opacity as a number
  inset: string = '' // Inset as a string
): string {
  const [x, y] = offset
  const [blur, spread] = radius

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`
}

export default boxShadow
