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

// Dashboard components
import Subscriptions from '~/layouts/dashboard/components/Subscriptions'
import Expirations from '~/layouts/dashboard/components/Expirations'

import WeekendIcon from '@mui/icons-material/Weekend'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import StoreIcon from '@mui/icons-material/Store'
import useServices from '~/hooks/useServices'
import { useMemo } from 'react'

function Dashboard() {
  const services = useServices()
  console.log(services)

  const now = new Date()

  const thisYearSubscriptions = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) => new Date(sub.expiresAt).getFullYear() === now.getFullYear()
    )
  )

  const lastYearSubscriptions = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) => new Date(sub.expiresAt).getFullYear() === now.getFullYear() - 1
    )
  )

  const thisMonthSubscriptions = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) =>
        new Date(sub.expiresAt).getFullYear() === now.getFullYear() &&
        new Date(sub.expiresAt).getMonth() === now.getMonth()
    )
  )

  const lastMonthSubscriptions = services?.filter((service) =>
    service.subscriptions?.some(
      (sub) =>
        new Date(sub.expiresAt).getFullYear() === now.getFullYear() &&
        new Date(sub.expiresAt).getMonth() === now.getMonth() - 1
    )
  )

  const thisMonthTotalSum = thisMonthSubscriptions?.reduce(
    (sum, service) =>
      sum +
      ((price = parseInt(service.subscriptions[0]?.price)) => (Number.isNaN(price) ? 0 : price))(),
    0
  )

  const lastMonthTotalSum = lastMonthSubscriptions?.reduce(
    (sum, service) =>
      sum +
      ((
        price = parseInt(
          service.subscriptions?.find(
            (sub) =>
              new Date(sub.expiresAt).getFullYear() === now.getFullYear() &&
              new Date(sub.expiresAt).getMonth() === now.getMonth() - 1
          )?.price
        )
      ) => (Number.isNaN(price) ? 0 : price))(),
    0
  )

  const thisYearTotalSum = thisYearSubscriptions?.reduce(
    (sum, service) =>
      sum +
      service.subscriptions
        ?.filter((sub) => new Date(sub.expiresAt).getFullYear() === now.getFullYear())
        .reduce(
          (sum2, sub) =>
            sum2 + ((price = parseInt(sub.price)) => (Number.isNaN(price) ? 0 : price))(),
          0
        ),
    0
  )

  const lastYearTotalSum = lastYearSubscriptions?.reduce(
    (sum, service) =>
      sum +
      service.subscriptions
        ?.filter((sub) => new Date(sub.expiresAt).getFullYear() === now.getFullYear() - 1)
        .reduce(
          (sum2, sub) =>
            sum2 + ((price = parseInt(sub.price)) => (Number.isNaN(price) ? 0 : price))(),
          0
        ),
    0
  )

  const loginsBarCharData = useMemo(() => {
    const now = new Date()
    const loginsPerDay = [0, 0, 0, 0, 0, 0, 0]
    const dayShortNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

    const todayIndex = now.getDay()
    const relativeDayLabels = Array.from({ length: 7 }, (_, index) => {
      const dayIndex = (todayIndex - 6 + index + 7) % 7
      return dayShortNames[dayIndex]
    })

    const lastWeekLogins = services?.filter((service) =>
      service.logins?.some((login) => {
        const loginDate = new Date(login.timestamp.toMillis())
        const diffInDays = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24))
        return diffInDays >= 0 && diffInDays < 7
      })
    )

    lastWeekLogins?.forEach((service) => {
      service.logins?.forEach((login) => {
        const loginDate = new Date(login.timestamp.toMillis())
        const diffInDays = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffInDays >= 0 && diffInDays < 7) {
          const relativeIndex = (6 - diffInDays) % 7
          loginsPerDay[relativeIndex]++
        }
      })
    })
    
    console.log('loginsPerDay', loginsPerDay)
    // Return the data for the bar chart
    return {
      labels: relativeDayLabels,
      datasets: { label: 'Logins', data: loginsPerDay }
    }
  }, [services])
  
  const monthlyExpensesBarChartData = useMemo(() => {
    const now = new Date()

    const expensesPerMonth = new Array(12).fill(0)
    const monthShortNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const currentMonth = now.getMonth()
    const relativeMonthLabels = Array.from({ length: 12 }, (_, index) => {
      const monthIndex = (currentMonth - 11 + index + 12) % 12
      return monthShortNames[monthIndex]
    })

    const lastYearSubscriptions = services?.filter((service) =>
      service.subscriptions?.some((subscription) => {
        const paymentDate = new Date(subscription.expiresAt)
        const diffInMonths =
          (now.getFullYear() - paymentDate.getFullYear()) * 12 +
          (now.getMonth() - paymentDate.getMonth())
        return diffInMonths >= 0 && diffInMonths < 12 && subscription.isPayed
      })
    )

    lastYearSubscriptions?.forEach((service) => {
      service.subscriptions?.forEach((subscription) => {
        const paymentDate = new Date(subscription.expiresAt)
        const diffInMonths =
          (now.getFullYear() - paymentDate.getFullYear()) * 12 +
          (now.getMonth() - paymentDate.getMonth())

        if (diffInMonths >= 0 && diffInMonths < 12) {
          const relativeIndex = 11 - diffInMonths
          expensesPerMonth[relativeIndex] += parseInt(subscription.price)
        }
      })
    })

    return {
      labels: relativeMonthLabels,
      datasets: { label: 'Gastado ($)', data: expensesPerMonth }
    }
  }, [services])
  
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
                count={services?.length ?? 0}
                percentage={{
                  color: 'success',
                  amount: '+' + (thisYearSubscriptions?.length - lastYearSubscriptions?.length),
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
                count={'$' + (thisMonthTotalSum ?? 0)}
                percentage={((
                  val = ((thisMonthTotalSum - lastMonthTotalSum) / Math.max(lastMonthTotalSum, 1)) *
                    100
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
                title="Costos del Año"
                count={'$' + (thisYearTotalSum ?? 0)}
                percentage={((
                  val = ((thisYearTotalSum - lastYearTotalSum) / Math.max(lastYearTotalSum, 1)) *
                    100
                ) => ({
                  amount: (val > 0 ? '+' : '') + Math.floor(val) + '%',
                  color: val > 0 ? 'error' : 'success',
                  label: 'desde el año pasado'
                }))()}
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
                  title="Numero de Inicios de Sesión"
                  description="Frecuencia de uso"
                  date="Semanal"
                  chart={loginsBarCharData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Gastos mensuales"
                  description="Numero de Gastos por Cada Mes"
                  date="Principio de año"
                  chart={monthlyExpensesBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Subscriptions />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Expirations />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Dashboard
