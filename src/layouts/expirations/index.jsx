// @mui material components
import Grid from '@mui/material/Grid'
import React from 'react'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'

// Material Dashboard 2 React examples
import DashboardLayout from '~examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '~examples/Navbars/DashboardNavbar'
import Footer from '~layouts/authentication/components/Footer'

// Billing page components
import useServices from '~/hooks/useServices'
import { Card, Divider } from '@mui/material'
import MDTypography from '~/components/MDTypography'
import { lowerCapitalize } from '~/utils'
import TimelineItem from '~/examples/Timeline/TimelineItem'
import Expiration from './components/Expiration'

function Expirations() {
  const services = useServices()

  const rows = services
    ?.map((service) => {
      const { subscriptions, ...rest } = service

      return subscriptions?.map((subscription) => ({ subscription, service: rest })) ?? []
    })
    .flat()
    .sort(
      (a, b) =>
        a.subscription.isPayed - b.subscription.isPayed ||
        new Date(b.subscription.expiresAt).getTime() - new Date(a.subscription.expiresAt).getTime()
    )

  console.log('rows', rows)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <MDBox mb={3}>
          <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
              <Card id="delete-account">
                <MDBox pt={3} px={2}>
                  <MDTypography variant="h5" fontWeight="medium" mb={3}>
                    Ultimos pagos
                  </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={2} px={2}>
                  <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {rows?.map((row, i) => (
                      <>
                        <MDBox display="flex" justifyContent="space-between">
                          <TimelineItem
                            image={`https://cdn.brandfetch.io/${
                              row.service?.domain ??
                              row.service?.serviceName.replace(' ', '') + '.com'
                            }/w/400/h/400/fallback/lettermark`}
                            title={lowerCapitalize(row.service?.serviceName)}
                            size="lg"
                            description={row.service?.domain}
                            lastItem={rows.length - 1 === i}
                            pt={1.5}
                            pb={1.5}
                          />
                          <MDBox
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                            justifyContent="space-between"
                            padding="16px"
                            marginLeft="auto"
                          >
                            <MDTypography component="p" fontSize="0.75rem">
                              {new Date(row.subscription?.expiresAt).toLocaleDateString({
                                language: 'es-EN'
                              })}
                              {row.subscription?.cycle && ` (${row.subscription?.cycle})`}
                            </MDTypography>
                            <MDTypography component="p" fontSize="0.875rem">
                              ${row.subscription?.price}
                            </MDTypography>
                          </MDBox>
                          <Expiration service={row.service} subscription={row.subscription} />
                        </MDBox>
                        {rows.length - 1 !== i && (
                          <Divider variant="fullWidth" flexItem sx={{ my: 0, opacity: 1 }} />
                        )}
                      </>
                    ))}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Expirations
