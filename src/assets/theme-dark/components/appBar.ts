import { AppBarProps } from '@mui/material'

const appBar = {
  defaultProps: {
    color: 'transparent' as AppBarProps['color'],
  },

  styleOverrides: {
    root: {
      boxShadow: 'none',
    },
  },
}

export default appBar
