// @mui material components
import Grid from '@mui/material/Grid'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'

// Material Dashboard 2 React example components
import DashboardLayout from '~examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '~examples/Navbars/DashboardNavbar'
import Footer from '~examples/Footer'
import ReportsBarChart from '~examples/Charts/BarCharts/ReportsBarChart'
import ReportsLineChart from '~examples/Charts/LineCharts/ReportsLineChart'
import ComplexStatisticsCard from '~examples/Cards/StatisticsCards/ComplexStatisticsCard'

// Data
import reportsBarChartData from '~layouts/dashboard/data/reportsBarChartData'
import reportsLineChartData from '~layouts/dashboard/data/reportsLineChartData'

// Dashboard components
import Projects from '~layouts/dashboard/components/Projects'
import OrdersOverview from '~layouts/dashboard/components/OrdersOverview'

import WeekendIcon  from '@mui/icons-material/Weekend'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import StoreIcon from '@mui/icons-material/Store'

function Dashboard() {
  const { sales, tasks } = reportsLineChartData

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<WeekendIcon fontSize="small"/>}
                title="Suscripciones"
                count={10}
                percentage={{
                  color: 'success',
                  amount: '+20',
                  label: 'desde el año pasado'
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard                
                icon={<AttachMoneyIcon fontSize="small"/>}
                title="Costo Mensual"
                count="$16000"
                percentage={{
                  color: 'error',
                  amount: '+15%',
                  label: 'desde este año'
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<StoreIcon fontSize="small"/>}
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
                icon={<StoreIcon fontSize="small"/>}
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
                  title="App mas utilizadas por mes"
                  description="Frecuencia de uso"
                  date="Principio de año"
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
