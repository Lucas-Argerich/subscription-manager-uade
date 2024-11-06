// @mui material components
import Card from '@mui/material/Card'
import Icon from '@mui/material/Icon'
import useServices from '~/hooks/useServices'
import { lowerCapitalize } from '~/utils'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'

// Material Dashboard 2 React example components
import TimelineItem from '~examples/Timeline/TimelineItem'

function Expirations() {
  const services = useServices()

  const expirations = services
    ?.map((service) => {
      const latestSubscription = service.subscriptions?.sort(
        (a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime() 
      )[0]

      return { service, expiration: new Date(latestSubscription?.expiresAt) }
    })
    .sort((a, b) => a.expiration - b.expiration)

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Próximos vencimientos
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp; Proximo vencimiento en{' '}
            <MDTypography variant="button" color="text" fontWeight="medium">
              {expirations &&
                Math.round(
                  (expirations[0]?.expiration.getTime() - new Date().getTime()) / 86400000
                )}{' '}
            </MDTypography>
            días
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {expirations?.map((expiration, i) => (
          <TimelineItem
            color="error"
            image={`https://cdn.brandfetch.io/${
              expiration.service.domain ?? expiration.service.serviceName.replace(' ', '') + '.com'
            }/w/400/h/400/fallback/lettermark`}
            title={lowerCapitalize(expiration.service.serviceName)}
            dateTime={expiration.expiration.toLocaleDateString({ language: 'es-EN' })}
            lastItem={expirations.length - 1 === i}
          />
        ))}
      </MDBox>
    </Card>
  )
}

export default Expirations
