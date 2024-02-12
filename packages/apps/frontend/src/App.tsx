import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/sign-in'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
])

function App() {
  const defaultTheme = createTheme()

  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
