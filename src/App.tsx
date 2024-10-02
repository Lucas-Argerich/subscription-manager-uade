import { createBrowserRouter, Link,  Navigate,  Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="auth/login">Login</Link>
        <Link to="auth/register">Register</Link>
      </div>
    )
  },
  {
    path: 'auth',
    element: <Outlet />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
