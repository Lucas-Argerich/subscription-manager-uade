// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'
import SubForm from '~/components/SubForm'

// Material Dashboard 2 React example components
import DashboardLayout from '~examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '~examples/Navbars/DashboardNavbar'
import Footer from '~layouts/authentication/components/Footer'
import DataTable from '~examples/Tables/DataTable'
import useServices from '~/hooks/useServices'
import Project from './components/Project'
import HiddenPassword from './components/HiddenPassword'
import MDOptions from '~/components/MDOptions'
import Progress from './components/Progress'
import { lowerCapitalize } from '~/utils'

function Tables() {
  const services = useServices()

  const handleEdit = () => {}

  const handleDelete = () => {}

  const columns = [
    { Header: 'Servicio', accessor: 'service', width: '30%', align: 'left' },
    { Header: 'Costo', accessor: 'cost', align: 'left' },
    { Header: 'Costo Acumulado', accessor: 'accumulated', align: 'left' },
    { Header: 'Plan', accessor: 'plan', align: 'center' },
    { Header: 'Uso', accessor: 'use', align: 'center' },
    { Header: 'Cuenta', accessor: 'account', align: 'center' },
    { Header: 'Contraseña', accessor: 'password', align: 'center' },
    { Header: 'Seguridad credenciales', accessor: 'security', align: 'center' },
    { Header: 'Acción', accessor: 'action', align: 'center' }
  ]

  const rows =
    services?.map((service, i) => {
      const latestSubscription = service.subscriptions?.sort(
        (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
      )[0]

      return {
        key: i,
        service: (
          <Project
            image={`https://cdn.brandfetch.io/${
              service.domain ?? service.serviceName.replace(' ', '') + '.com'
            }/w/400/h/400/fallback/lettermark`}
            name={lowerCapitalize(service.serviceName)}
          />
        ),
        cost: (
          <MDTypography component="p" variant="button" color="text" fontWeight="medium">
            {latestSubscription?.plan === 'free' ? 'Gratis' : `$${latestSubscription?.price}`}
          </MDTypography>
        ),
        accumulated: (
          <MDTypography component="p" variant="button" color="text" fontWeight="medium">
            $
            {service.subscriptions?.reduce(
              (count, val) => count + (Number.isNaN(parseInt(val.price)) ? 0 : parseInt(val.price)),
              0
            )}
          </MDTypography>
        ),
        plan: (
          <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
            {latestSubscription?.plan}
          </MDTypography>
        ),
        use: (
          <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
            {service.logins?.length} Logs
          </MDTypography>
        ),
        account: (
          <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
            {service.username}
          </MDTypography>
        ),
        password: <HiddenPassword password={service.passwordEncrypted} />,
        security: <Progress color="info" value={60} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <MDOptions onEdit={handleEdit} onDelete={handleDelete} />
          </MDTypography>
        )
      }
    }) ?? []

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SubForm />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Suscripciones
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Tables
