import theme from '~assets/theme'
import themeDark from '~assets/theme-dark'
import themeDarkRTL from '~assets/theme-dark/theme-rtl'
import themeRTL from '~assets/theme/theme-rtl'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import Sidenav from '~examples/Sidenav'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import brandDark from '~assets/images/logo-ct-dark.png'
import brandWhite from '~assets/images/logo-ct.png'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import rtlPlugin from 'stylis-plugin-rtl'
import { setMiniSidenav, useMaterialUIController } from './context'
import routes from './routes'

export default function App() {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode
  } = controller

  const [onMouseEnter, setOnMouseEnter] = useState(false)

  // Create a default RTL cache at initialization
  const rtlCache = useMemo(() => {
    return createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin]
    })
  }, [])

  const { pathname } = useLocation()

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        return <Route key={route.key} path={route.route} element={route.component} />
      }

      return null
    })

  return direction === 'rtl' ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === 'dashboard' && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard 2"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand="/logo.png"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  )
}
