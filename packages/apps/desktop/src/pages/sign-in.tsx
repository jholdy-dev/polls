import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { LoginRequest, loginRequestSchema } from '@lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginService } from '../services'
import { useAuthStore } from '../stores'

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
  })
  const { setUser } = useAuthStore()

  async function login(data: LoginRequest) {
    try {
      const result = await loginService.login(data)
      console.log(result)
      setUser(result.user)
      localStorage.setItem('token', result.token)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(login)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            autoFocus
            type="number"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 11,
              minLength: 11,
            }}
            {...register('cpf')}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            inputProps={{ minLength: 10, maxLength: 10 }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
