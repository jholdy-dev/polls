import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { User, userSchema } from '@lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userService } from '../../../services'

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  })

  async function create(data: User) {
    try {
      await userService.create(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(create)}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save
      </Button>
    </Box>
  )
}
