import Dashboard from '~layouts/dashboard'
import Tables from '~layouts/tables'
import SignIn from '~layouts/authentication/sign-in'
import SignUp from '~layouts/authentication/sign-up'
import ResetPassword from '~/layouts/authentication/reset-password'

// @mui icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableViewIcon from '@mui/icons-material/TableView'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import SignOut from './layouts/authentication/sign-out'
import Expirations from './layouts/expirations'

const routes = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'dashboard',
    icon: <DashboardIcon fontSize="small" />,
    route: '/dashboard',
    component: <Dashboard />
  },
  {
    type: 'collapse',
    name: 'Suscripciones',
    key: 'tables',
    icon: <TableViewIcon fontSize="small" />,
    route: '/tables',
    component: <Tables />
  },
  {
    type: 'collapse',
    name: 'Vencimientos',
    key: 'billing',
    icon: <ReceiptLongIcon fontSize="small" />,
    route: '/billing',
    component: <Expirations />
  },
  {
    type: 'collapse',
    name: 'Iniciar Sesión',
    key: 'sign-in',
    icon: <LoginIcon fontSize="small" />,
    route: '/authentication/sign-in',
    component: <SignIn />
  },
  {
    type: 'collapse',
    name: 'Registrarse',
    key: 'sign-up',
    icon: <LogoutIcon fontSize="small" />,
    route: '/authentication/sign-up',
    component: <SignUp />
  },
  {
    type: 'collapse',
    name: 'Cerrar Sesión',
    icon: <LogoutIcon fontSize="small" />,
    route: '/authentication/sign-out',
    component: <SignOut />
  },
  {
    route: '/authentication/reset-password',
    component: <ResetPassword />
  }
]

export default routes
