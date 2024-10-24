// @mui material components
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'

// Material Dashboard 2 React examples
import DashboardLayout from '~examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '~examples/Navbars/DashboardNavbar'
import Footer from '~examples/Footer'
import MasterCard from '~examples/Cards/MasterCard'
import DefaultInfoCard from '~examples/Cards/InfoCards/DefaultInfoCard'

// Billing page components
import PaymentMethod from '~layouts/billing/components/PaymentMethod'
import Invoices from '~layouts/billing/components/Invoices'
import BillingInformation from '~layouts/billing/components/BillingInformation'
import Transactions from '~layouts/billing/components/Transactions'

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>            
              <Grid container spacing={3}>
              <PaymentMethod />               
                <Grid item xs={12}>                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
              <BillingInformation />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Billing
