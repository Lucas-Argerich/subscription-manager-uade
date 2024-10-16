import Dashboard from '~layouts/dashboard'
import Tables from '~layouts/tables'
import Billing from '~layouts/billing'
import RTL from '~layouts/rtl'
import SignIn from '~layouts/authentication/sign-in'
import SignUp from '~layouts/authentication/sign-up'

// @mui icons
import Icon from '@mui/material/Icon'

const routes = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Suscripciones',
    key: 'tables',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/tables',
    component: <Tables />,
  },
  {
    type: 'collapse',
    name: 'Vencimientos',
    key: 'billing',
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: '/billing',
    component: <Billing />,
  },
  {
    type: 'collapse',
    name: 'Credenciales',
    key: 'rtl',
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: '/rtl',
    component: <RTL />,
  },
  {
    type: 'collapse',
    name: 'Sign In',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    type: 'collapse',
    name: 'Sign Up',
    key: 'sign-up',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
]

export default routes
