import Dashboard from '~layouts/dashboard'
import Tables from '~layouts/tables'
import Billing from '~layouts/billing'
import RTL from '~layouts/rtl'
import SignIn from '~layouts/authentication/sign-in'
import SignUp from '~layouts/authentication/sign-up'
import ResetPassword from '~/layouts/authentication/reset-password'

// @mui icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableViewIcon from '@mui/icons-material/TableView'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

const routes = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'dashboard',
    icon: <DashboardIcon  fontSize="small"/>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Suscripciones',
    key: 'tables',
    icon: <TableViewIcon fontSize="small" />,
    route: '/tables',
    component: <Tables />,
  },
  {
    type: 'collapse',
    name: 'Vencimientos',
    key: 'billing',
    icon: <ReceiptLongIcon fontSize="small" />,
    route: '/billing',
    component: <Billing />,
  },
  {
    type: 'collapse',
    name: 'Credenciales',
    key: 'rtl',
    icon: <AssignmentIndIcon fontSize="small"/>,
    route: '/rtl',
    component: <RTL />,
  },
  {
    type: 'collapse',
    name: 'Sign In',
    key: 'sign-in',
    icon: <LoginIcon fontSize="small" />,
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    type: 'collapse',
    name: 'Sign Up',
    key: 'sign-up',
    icon: <LogoutIcon fontSize="small" />,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
  {
    route: '/authentication/reset-password',
    component: <ResetPassword />
  }
]

export default routes
