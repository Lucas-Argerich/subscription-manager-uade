// Material Dashboard 2 React base styles
import colors from '~assets/theme/base/colors'

const { transparent } = colors

const select = {
  styleOverrides: {

    select: {
      display: 'grid',
      alignItems: 'center',
      '& .Mui-selected': {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: 'none',
      height: 'none',
      minHeight: 'none',
      overflow: 'unset',
    },
  },
}

export default select
