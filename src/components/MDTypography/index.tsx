import { forwardRef, ReactNode } from 'react'

// Custom styles for MDTypography
import MDTypographyRoot from '~components/MDTypography/MDTypographyRoot'

// Material Dashboard 2 React contexts
import { useMaterialUIController } from '~/context'

interface MDTypographyProps {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'text'
    | 'white'
  fontWeight?: false | 'light' | 'regular' | 'medium' | 'bold'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  verticalAlign?:
    | 'unset'
    | 'baseline'
    | 'sub'
    | 'super'
    | 'text-top'
    | 'text-bottom'
    | 'middle'
    | 'top'
    | 'bottom'
  textGradient?: boolean
  opacity?: number
  children: ReactNode
  [key: string]: unknown // allows additional props
}

const MDTypography = forwardRef<HTMLElement, MDTypographyProps>(
  (
    {
      color = 'dark',
      fontWeight = false,
      textTransform = 'none',
      verticalAlign = 'unset',
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController()
    const { darkMode } = controller

    return (
      <MDTypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode
        }}
      >
        {children}
      </MDTypographyRoot>
    )
  }
)

export default MDTypography
