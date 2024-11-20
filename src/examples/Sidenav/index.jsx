import { useEffect } from 'react'

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom'

// @mui material components
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'

// Material Dashboard 2 React example components
import SidenavCollapse from '~examples/Sidenav/SidenavCollapse'

// Custom styles for the Sidenav
import SidenavRoot from '~examples/Sidenav/SidenavRoot'
import sidenavLogoLabel from '~examples/Sidenav/styles/sidenav'

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav
} from '~/context'
import useUser from '~/hooks/useUser'

// Define the types for route objects

function Sidenav({ brand = '', brandName, routes, ...rest }) {
  const user = useUser()
  const [controller, dispatch] = useMaterialUIController()
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller
  const location = useLocation()
  const collapseName = location.pathname.replace('/', '')

  let textColor = 'white'

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark'
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit'
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true)

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200)
      setTransparentSidenav(dispatch, window.innerWidth >= 1200 ? transparentSidenav : false)
      setWhiteSidenav(dispatch, window.innerWidth >= 1200 ? whiteSidenav : false)
    }

    window.addEventListener('resize', handleMiniSidenav)
    handleMiniSidenav()

    return () => window.removeEventListener('resize', handleMiniSidenav)
  }, [dispatch, location, transparentSidenav, whiteSidenav])

  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue

    if (user && (key === 'sign-in' || key === 'sign-up')) return
    if (!user && key === 'sign-out') return

    if (type === 'collapse') {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: 'none' }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route ?? ''}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      )
    } else if (type === 'title') {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      )
    } else if (type === 'divider') {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      )
    }

    return returnValue
  })

  if (!user) return

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={3} textAlign="center">
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" gap="6px" lineHeight="12px">
          {brand && <MDBox component="img" src={brand} alt="Brand" height="3rem" margin="auto" />}
          <MDBox
            width={!brandName ? '100%' : undefined}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="h4" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      {/* <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          href="https://www.creative-tim.com/product/material-dashboard-pro-react"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          color={sidenavColor}
          fullWidth
        >
          Actualizar a Version Premium
        </MDButton>
      </MDBox> */}
    </SidenavRoot>
  )
}

export default Sidenav
