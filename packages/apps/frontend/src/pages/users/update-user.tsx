import { zodResolver } from '@hookform/resolvers/zod'
import { User, userSchema } from '@lib/schema'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useSnackbarStore, useTabsUserStore } from '../../stores'
import { ComponentProps } from '../../components'

export const UpdateUser: React.FC<ComponentProps<User>> = ({
  data,
  handleEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: data,
    resolver: zodResolver(userSchema),
  })
  const { setTab } = useTabsUserStore()
  const { opened } = useSnackbarStore()

  async function update(data: User) {
    try {
      await handleEdit(data)
      console.log(data)
      opened('User created!', 'success')
      reset()
      setTab('0')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(update)}
      noValidate
      style={{
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
      sx={{ mt: 8, p: 2 }}
    >
      <h2>Edit User</h2>
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
        Edit
      </Button>
    </Box>
  )
}
