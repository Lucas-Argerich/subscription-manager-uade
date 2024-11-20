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
import MDOptions from '~/components/MDOptions'
import { lowerCapitalize } from '~/utils'
import { db } from '~/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import useUser from '~/hooks/useUser'

function Tables() {
  const user = useUser()
  const services = useServices()

  const handleDelete = async (id) => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'services', id))
  }

  const columns = [
    { Header: 'Servicio', accessor: 'service', width: '30%', align: 'left' },
    { Header: 'Costo', accessor: 'cost', align: 'left' },
    { Header: 'Costo Acumulado', accessor: 'accumulated', align: 'left' },
    { Header: 'Plan', accessor: 'plan', align: 'center' },
    { Header: 'Uso', accessor: 'use', align: 'center' },
    { Header: 'Costo por Uso', accessor: 'relation', align: 'center' },
    { Header: 'Acción', accessor: 'action', align: 'center' }
  ]

  const rows =
    services?.map((service, i) => {
      const latestSubscription = service.subscriptions?.sort(
        (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
      )[0]

      const accumulatedCost = service.subscriptions?.reduce(
        (count, val) => count + (Number.isNaN(parseInt(val.price)) ? 0 : parseInt(val.price)),
        0
      )

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
            ${accumulatedCost}
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
        relation: (
          <MDBox>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              ${(accumulatedCost/(service.logins?.length || 1)).toFixed(2)}
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <MDOptions onDelete={() => handleDelete(service.id)} />
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
