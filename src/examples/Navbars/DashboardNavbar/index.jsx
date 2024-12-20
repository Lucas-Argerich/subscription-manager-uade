import { useState, useEffect } from 'react'

// react-router components
import { useLocation } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @material-ui core components
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Menu from '@mui/material/Menu'
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'

// Material Dashboard 2 React example components
import Breadcrumbs from '~examples/Breadcrumbs'
import NotificationItem from '~examples/Items/NotificationItem'

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
} from '~examples/Navbars/DashboardNavbar/styles'

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
} from '~/context'
import MDButton from '~/components/MDButton'

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useMaterialUIController()
  const { transparentNavbar, fixedNavbar, darkMode } = controller
  const [openMenu, setOpenMenu] = useState(false)
  const route = useLocation().pathname.split('/').slice(1)

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar)
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar)

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const handleCloseMenu = () => setOpenMenu(false)

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  )

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? 'white' : 'inherit'}>
              <a href='https://chromewebstore.google.com/category/extensions' target='_blank'>
              <MDButton color="info">INSTALAR EXTENSIÓN</MDButton>
              </a>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  )
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
}

export default DashboardNavbar
