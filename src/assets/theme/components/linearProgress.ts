// Material Dashboard 2 React base styles
import borders from '~assets/theme/base/borders'
import colors from '~assets/theme/base/colors'

// Material Dashboard 2 React helper functions
import pxToRem from '~assets/theme/functions/pxToRem'

const { borderRadius } = borders
const { light } = colors

const linearProgress = {
  styleOverrides: {
    root: {
      height: pxToRem(6),
      borderRadius: borderRadius.md,
      overflow: 'visible',
      position: 'relative',
      variants: []
    },

    colorPrimary: {
      backgroundColor: light.main,
    },

    colorSecondary: {
      backgroundColor: light.main,
    },

    bar: {
      height: pxToRem(6),
      borderRadius: borderRadius.sm,
      position: 'absolute',
      transform: 'translate(0, 0) !important',
      transition: 'width 0.6s ease !important',
      variants: []
    },
  },
}

export default linearProgress
