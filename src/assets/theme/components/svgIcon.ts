// Material Dashboard 2 React helper functions
import { IconProps } from '@mui/material'
import pxToRem from '~assets/theme/functions/pxToRem'

const svgIcon = {
  defaultProps: {
    fontSize: 'inherit' as IconProps['fontSize'],
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: 'inherit !important',
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
  },
}

export default svgIcon
