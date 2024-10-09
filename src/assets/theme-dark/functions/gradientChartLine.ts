/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */

// Material Dashboard 2 React helper functions
import rgba from '@assets/theme-dark/functions/rgba'

function gradientChartLine(
  chart: CanvasRenderingContext2D, // Type for the canvas context
  color: string, // Color as a string (e.g., "rgba(255, 0, 0, 1)")
  opacity: number = 0.2 // Default opacity
): CanvasGradient {
  // Return type for gradient
  const ctx = chart
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
  const primaryColor = rgba(color, opacity).toString()

  gradientStroke.addColorStop(1, primaryColor)
  gradientStroke.addColorStop(0.2, 'rgba(72, 72, 176, 0.0)')
  gradientStroke.addColorStop(0, 'rgba(203, 12, 159, 0)')

  return gradientStroke
}

export default gradientChartLine
