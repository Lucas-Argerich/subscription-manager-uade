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
      const { subscriptions, ...rest } = service

      return subscriptions?.map((subscription) => ({ subscription, service: rest })) ?? []
    })
    .flat()
    .filter(({ subscription }) => subscription.isPayed === false)
    .sort(
      (a, b) =>
        a.subscription.isPayed - b.subscription.isPayed ||
        new Date(a.subscription.expiresAt).getTime() - new Date(b.subscription.expiresAt).getTime()
    )

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
            {expirations?.length ? (
              <>
                &nbsp; Proximo vencimiento en{' '}
                <MDTypography variant="button" color="text" fontWeight="medium">
                  {expirations &&
                    Math.round(
                      (new Date(expirations[0]?.subscription?.expiresAt).getTime() -
                        new Date().getTime()) /
                        86400000
                    )}{' '}
                </MDTypography>
                días
              </>
            ) : (
              ' Sin próximos vencimientos'
            )}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2} pt={0}>
        {expirations?.slice(0, 7).map((expiration, i) => (
          <TimelineItem
            color="error"
            image={`https://cdn.brandfetch.io/${
              expiration.service.domain ?? expiration.service.serviceName.replace(' ', '') + '.com'
            }/w/400/h/400/fallback/lettermark`}
            title={lowerCapitalize(expiration.service.serviceName)}
            dateTime={new Date(expiration.subscription?.expiresAt).toLocaleDateString({
              language: 'es-EN'
            })}
            lastItem={Math.min(6, expirations?.length - 1) === i}
          />
        ))}
      </MDBox>
    </Card>
  )
}

export default Expirations
