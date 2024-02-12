import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import SignIn from './pages/sign-in'
import { useAuthStore } from './stores'
import Dashboard from './pages/dashboard'

type PrivateRouteProps = {
  Component: React.ReactNode | JSX.Element | any
}

export function PublicRoute({ Component }: PrivateRouteProps) {
  const user = useAuthStore((store) => store.user)
  return user ? <Navigate to="/dashboard" replace /> : <Component />
}

function PrivateRoute({ Component }: PrivateRouteProps) {
  const user = useAuthStore((store) => store.user)

  return user ? <Component /> : <Navigate to="/" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute Component={SignIn} />,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute Component={Dashboard} />,
  },
])

function App() {
  const defaultTheme = createTheme()
  const userCache = localStorage.getItem('user')

  if (userCache) {
    useAuthStore.getState().setUser(JSON.parse(userCache))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
