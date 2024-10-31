import MDAvatar from '~/components/MDAvatar'
import MDBox from '~/components/MDBox'
import MDTypography from '~/components/MDTypography'

const Project = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" variant="rounded" />
    <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
      {name}
    </MDTypography>
  </MDBox>
)

export default Project
