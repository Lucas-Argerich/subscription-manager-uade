// @mui material components
import Grid from '@mui/material/Grid'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'

// Material Dashboard 2 React example components
import DashboardLayout from '~examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '~examples/Navbars/DashboardNavbar'
import Footer from '~layouts/authentication/components/Footer'
import ReportsBarChart from '~examples/Charts/BarCharts/ReportsBarChart'
import ReportsLineChart from '~examples/Charts/LineCharts/ReportsLineChart'
import ComplexStatisticsCard from '~examples/Cards/StatisticsCards/ComplexStatisticsCard'

// Data
import reportsBarChartData from '~layouts/dashboard/data/reportsBarChartData'
import reportsLineChartData from '~layouts/dashboard/data/reportsLineChartData'

// Dashboard components
import Projects from '~layouts/dashboard/components/Projects'
import OrdersOverview from '~layouts/dashboard/components/OrdersOverview'

import WeekendIcon from '@mui/icons-material/Weekend'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import StoreIcon from '@mui/icons-material/Store'
import useServices from '~/hooks/useServices'

function Dashboard() {
  const services = useServices()
  console.log(services)
  const { sales, tasks } = reportsLineChartData

  const now = new Date()

  const thisYearServices = services?.filter((service) =>
    service.subscriptions?.some((sub) => new Date(sub.payedAt).getFullYear() === now.getFullYear())
  )

  const lastYearServices = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) => new Date(sub.payedAt).getFullYear() === now.getFullYear() - 1
    )
  )

  const thisMonthServices = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) =>
        new Date(sub.payedAt).getFullYear() === now.getFullYear() &&
        new Date(sub.payedAt).getMonth() === now.getMonth()
    )
  )

  const lastMonthServices = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) =>
        new Date(sub.payedAt).getFullYear() === now.getFullYear() &&
        new Date(sub.payedAt).getMonth() === now.getMonth() - 1
    )
  )

  const thisMonthTotalSum = thisMonthServices?.reduce(
    (sum, service) => sum + parseInt(service.subscriptions[0]?.price),
    0
  )

  const lastMonthTotalSum = lastMonthServices?.reduce(
    (sum, service) =>
      sum +
      (service.subscriptions?.find(
        (sub) =>
          new Date(sub.payedAt).getFullYear() === now.getFullYear() &&
          new Date(sub.payedAt).getMonth() === now.getMonth() - 1
      )?.price ?? 0),
    0
  )

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<WeekendIcon fontSize="small" />}
                title="Suscripciones"
                count={services?.length}
                percentage={{
                  color: 'success',
                  amount: '+' + (thisYearServices?.length - lastYearServices?.length),
                  label: 'desde el año pasado'
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<AttachMoneyIcon fontSize="small" />}
                title="Costo Mensual"
                count={'$' + thisMonthTotalSum}
                percentage={((
                  val = ((thisMonthTotalSum - lastMonthTotalSum) / lastMonthTotalSum) * 100
                ) => ({
                  amount: (val > 0 ? '+' : '') + Math.floor(val) + '%',
                  color: val > 0 ? 'error' : 'success',
                  label: 'desde el mes pasado'
                }))()}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<StoreIcon fontSize="small" />}
                title="Algo"
                count="34k"
                percentage={{
                  color: 'success',
                  amount: '+1%',
                  label: 'than yesterday'
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<StoreIcon fontSize="small" />}
                title="Algo mas"
                count="+91"
                percentage={{
                  color: 'success',
                  amount: '',

                  label: 'Just updated'
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="App mas utilizadas"
                  description="Frecuencia de uso"
                  date="Semanal"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Costos mensuales"
                  description={
                    <>
                      (<strong>+15%</strong>) desde el principio de año.
                    </>
                  }
                  date="Principio de año"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Algo mas"
                  description="Poner algo mas"
                  date="Principio de año"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Dashboard
