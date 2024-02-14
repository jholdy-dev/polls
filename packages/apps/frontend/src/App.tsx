import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAuthStore, useSnackbarStore } from './stores'
import Dashboard from './pages/dashboard'
import Users from './pages/users'
import { Snackbar } from '@mui/material'
import Quizzes from './pages/quizzes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/users',
    element: <Users />,
  },
  {
    path: '/dashboard/quizzes',
    element: <Quizzes />,
  },
])

function App() {
  const { open, message, typeMessage, closened } = useSnackbarStore()
  const defaultTheme = createTheme()
  const userCache = localStorage.getItem('user')

  if (userCache) {
    useAuthStore.getState().setUser(JSON.parse(userCache))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
      <Snackbar
        open={open}
        color={typeMessage}
        autoHideDuration={3000}
        onClose={closened}
        message={message}
      />
    </ThemeProvider>
  )
}

export default App
