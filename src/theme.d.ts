// Import the base Theme interface from Material-UI
import { Theme as MuiTheme } from '@mui/material/styles'

interface BoxShadows {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
  inset: string
  colored: {
    primary: string
    secondary: string
    info: string
    success: string
    warning: string
    error: string
    light: string
    dark: string
  }
  navbarBoxShadow: string
  sliderBoxShadow: {
    thumb: string
  }
  tabsBoxShadow: {
    indicator: string
  }
}

interface Borders {
  borderColor: string
  borderWidth: {
    0: number
    1: string
    2: string
    3: string
    4: string
    5: string
  }
  borderRadius: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
    section: string
  }
}

// Extend the existing Material-UI theme to include your custom functions
declare module '@mui/material/styles' {
  interface Theme {
    functions: {
      pxToRem: (size: number) => string
      boxShadow: (
        color: string,
        offset: number[],
        blur: number[],
        spread: number,
        opacity: number
      ) => string
      hexToRgb: (color: string) => string
      linearGradient: (color1: string, color2: string) => string
      rgba: (color: string, opacity: number) => string
    }
    boxShadows: BoxShadows
    borders: Borders
  }

  // Allow configuration using `createTheme`
  interface ThemeOptions {
    functions?: {
      pxToRem?: (size: number) => string
      boxShadow?: (
        offset: [number, number], // x and y offset
        radius: [number, number], // blur and spread radius
        color: string, // color of the shadow
        opacity: number, // opacity of the shadow
        inset: string // optional inset specification
      ) => string
      hexToRgb?: (color: string) => string
      linearGradient?: (color1: string, color2: string) => string
      rgba?: (color: string, opacity: number) => string
    }
    boxShadows?: BoxShadows
    borders?: Borders
  }

  interface Palette {
    background: {
      default: string
    }
    text: {
      main: string
      focus: string
    }
    transparent: {
      main: string
    }
    white: {
      main: string
      focus: string
    }
    black: {
      light: string
      main: string
      focus: string
    }
    primary: {
      main: string
      focus: string
    }
    secondary: {
      main: string
      focus: string
    }
    info: {
      main: string
      focus: string
    }
    success: {
      main: string
      focus: string
    }
    warning: {
      main: string
      focus: string
    }
    error: {
      main: string
      focus: string
    }
    light: {
      main: string
      focus: string
    }
    dark: {
      main: string
      focus: string
    }
    grey: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
    gradients: {
      primary: {
        main: string
        state: string
      }
      secondary: {
        main: string
        state: string
      }
      info: {
        main: string
        state: string
      }
      success: {
        main: string
        state: string
      }
      warning: {
        main: string
        state: string
      }
      error: {
        main: string
        state: string
      }
      light: {
        main: string
        state: string
      }
      dark: {
        main: string
        state: string
      }
    }
    socialMediaColors: {
      facebook: {
        main: string
        dark: string
      }
      twitter: {
        main: string
        dark: string
      }
      instagram: {
        main: string
        dark: string
      }
      linkedin: {
        main: string
        dark: string
      }
      pinterest: {
        main: string
        dark: string
      }
      youtube: {
        main: string
        dark: string
      }
      vimeo: {
        main: string
        dark: string
      }
      slack: {
        main: string
        dark: string
      }
      dribbble: {
        main: string
        dark: string
      }
      github: {
        main: string
        dark: string
      }
      reddit: {
        main: string
        dark: string
      }
      tumblr: {
        main: string
        dark: string
      }
    }
    badgeColors: {
      primary: {
        background: string
        text: string
      }
      secondary: {
        background: string
        text: string
      }
      info: {
        background: string
        text: string
      }
      success: {
        background: string
        text: string
      }
      warning: {
        background: string
        text: string
      }
      error: {
        background: string
        text: string
      }
      light: {
        background: string
        text: string
      }
      dark: {
        background: string
        text: string
      }
    }
    coloredShadows: {
      primary: string
      secondary: string
      info: string
      success: string
      warning: string
      error: string
      light: string
      dark: string
    }
    inputBorderColor: string
    tabs: {
      indicator: {
        boxShadow: string
      }
    }
  }

  interface PaletteOptions {
    background?: {
      default?: string
    }
    text?: {
      main?: string
      focus?: string
    }
    transparent?: {
      main?: string
    }
    white?: {
      main?: string
      focus?: string
    }
    black?: {
      light?: string
      main?: string
      focus?: string
    }
    primary?: {
      main?: string
      focus?: string
    }
    secondary?: {
      main?: string
      focus?: string
    }
    info?: {
      main?: string
      focus?: string
    }
    success?: {
      main?: string
      focus?: string
    }
    warning?: {
      main?: string
      focus?: string
    }
    error?: {
      main?: string
      focus?: string
    }
    light?: {
      main?: string
      focus?: string
    }
    dark?: {
      main?: string
      focus?: string
    }
    grey?: {
      100?: string
      200?: string
      300?: string
      400?: string
      500?: string
      600?: string
      700?: string
      800?: string
      900?: string
    }
    gradients?: {
      primary?: {
        main?: string
        state?: string
      }
      secondary?: {
        main?: string
        state?: string
      }
      info?: {
        main?: string
        state?: string
      }
      success?: {
        main?: string
        state?: string
      }
      warning?: {
        main?: string
        state?: string
      }
      error?: {
        main?: string
        state?: string
      }
      light?: {
        main?: string
        state?: string
      }
      dark?: {
        main?: string
        state?: string
      }
    }
    socialMediaColors?: {
      facebook?: {
        main?: string
        dark?: string
      }
      twitter?: {
        main?: string
        dark?: string
      }
      instagram?: {
        main?: string
        dark?: string
      }
      linkedin?: {
        main?: string
        dark?: string
      }
      pinterest?: {
        main?: string
        dark?: string
      }
      youtube?: {
        main?: string
        dark?: string
      }
      vimeo?: {
        main?: string
        dark?: string
      }
      slack?: {
        main?: string
        dark?: string
      }
      dribbble?: {
        main?: string
        dark?: string
      }
      github?: {
        main?: string
        dark?: string
      }
      reddit?: {
        main?: string
        dark?: string
      }
      tumblr?: {
        main?: string
        dark?: string
      }
    }
    badgeColors?: {
      primary?: {
        background?: string
        text?: string
      }
      secondary?: {
        background?: string
        text?: string
      }
      info?: {
        background?: string
        text?: string
      }
      success?: {
        background?: string
        text?: string
      }
      warning?: {
        background?: string
        text?: string
      }
      error?: {
        background?: string
        text?: string
      }
      light?: {
        background?: string
        text?: string
      }
      dark?: {
        background?: string
        text?: string
      }
    }
    coloredShadows?: {
      primary?: string
      secondary?: string
      info?: string
      success?: string
      warning?: string
      error?: string
      light?: string
      dark?: string
    }
    inputBorderColor?: string
    tabs?: {
      indicator?: {
        boxShadow?: string
      }
    }
  }

  interface TypeText {
    main: string
    focus: string
  }
}

// Now extend the Theme interface in case you're accessing it directly in your codebase
export interface Theme extends MuiTheme {
  functions: {
    pxToRem: (size: number) => string
    boxShadow: (
      color: string,
      offset: number[],
      blur: number[],
      spread: number,
      opacity: number
    ) => string
    hexToRgb: (color: string) => string
    linearGradient: (color1: string, color2: string) => string
    rgba: (color: string, opacity: number) => string
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightLighter: React.CSSProperties['fontWeight']

    d1: TypographyStyleOptions
    d2: TypographyStyleOptions
    d3: TypographyStyleOptions
    d4: TypographyStyleOptions
    d5: TypographyStyleOptions
    d6: TypographyStyleOptions

    size: {
      xxs: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }

    lineHeight: {
      sm: number
      md: number
      lg: number
    }
  }
}
