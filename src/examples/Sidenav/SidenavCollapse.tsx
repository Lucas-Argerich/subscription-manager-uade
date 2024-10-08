/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from '@components/MDBox'

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText
} from 'examples/Sidenav/styles/sidenavCollapse'

// Material Dashboard 2 React context
import { useMaterialUIController } from 'context'

// Define props interface
interface SidenavCollapseProps {
  icon: React.ReactNode
  name: string
  active?: boolean
  [x: string]: unknown // To allow additional props
}

function SidenavCollapse({ icon, name, active = false, ...rest }: SidenavCollapseProps) {
  const [controller] = useMaterialUIController()
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller

  return (
    <ListItem component="li">
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            sidenavColor
          })
        }
      >
        <ListItemIcon
          sx={(theme) =>
            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
          }
        >
          {typeof icon === 'string' ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, {
              miniSidenav,
              transparentSidenav,
              whiteSidenav,
              active
            })
          }
        />
      </MDBox>
    </ListItem>
  )
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false
}

export default SidenavCollapse
