// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Grid from '@mui/material/Grid'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'

// Material Dashboard 2 React example components
import DefaultNavbar from '~examples/Navbars/DefaultNavbar'
import PageLayout from '~examples/LayoutContainers/PageLayout'

// Authentication pages components
import Footer from '~layouts/authentication/components/Footer'

function BasicLayout({ children }) {
  return (
    <PageLayout>
      <DefaultNavbar
      />
      <MDBox my="90px" width="100%" minHeight="100vh" height="100%" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={9} lg={9} xl={8}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  )
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BasicLayout
