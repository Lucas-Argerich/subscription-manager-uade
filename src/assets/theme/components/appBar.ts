import { AppBarProps } from '@mui/material/AppBar' // Ensure you import the necessary types

const appBar = {
  defaultProps: {
    color: 'transparent' as AppBarProps['color']
  },

  styleOverrides: {
    root: {
      boxShadow: 'none'
    }
  }
}

export default appBar
