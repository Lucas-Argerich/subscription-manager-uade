import { useState } from 'react'

// @mui material components
import Card from '@mui/material/Card'
import Icon from '@mui/material/Icon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'

// Material Dashboard 2 React examples
import DataTable from '~examples/Tables/DataTable'

// Data
import useServices from '~/hooks/useServices'
import Project from '~/layouts/tables/components/Project'
import { lowerCapitalize } from '~/utils'
import Progress from '~/layouts/tables/components/Progress'

function Subscriptions() {
  const services = useServices()

  const columns = [
    { Header: 'Servicio', accessor: 'companies', width: '45%', align: 'left' },
    { Header: 'Plan', accessor: 'plan', width: '10%', align: 'left' },
    { Header: 'Costo', accessor: 'cost', align: 'center' },
    { Header: 'Seguridad credenciales', accessor: 'security', align: 'center' }
  ]
  const rows =
    services?.slice(0, 6).map((service, i) => {
      const latestSubscription = service.subscriptions?.sort(
        (a, b) => a.expiresAt.seconds - b.expiresAt.seconds
      )[0]

      return {
        key: i,
        companies: (
          <Project
            image={`https://cdn.brandfetch.io/${
              service.domain ?? service.serviceName.replace(' ', '') + '.com'
            }/w/400/h/400/fallback/lettermark`}
            name={lowerCapitalize(service.serviceName)}
          />
        ),
        plan: (
          <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
            {latestSubscription?.plan}
          </MDTypography>
        ),
        cost: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            ${latestSubscription?.price}
          </MDTypography>
        ),
        security: <Progress color="info" value={60} />
      }
    }) ?? []
  const [menu, setMenu] = useState(null)

  const openMenu = ({ currentTarget }) => setMenu(currentTarget)
  const closeMenu = () => setMenu(null)

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  )

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Suscripciones
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: 'bold',
                color: ({ palette: { info } }) => info.main,
                mt: -0.5
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{services?.length}</strong> Actualmente
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  )
}

export default Subscriptions
