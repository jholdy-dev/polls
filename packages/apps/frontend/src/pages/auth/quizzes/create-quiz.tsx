import { zodResolver } from '@hookform/resolvers/zod'
import { CreateQuizDto, createQuizDtoSchema } from '@lib/schema'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useSnackbarStore, useTabsUserStore } from '../../../stores'
import { quizzesService } from '../../../services'

export function CreateQuiz() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuizDto>({
    resolver: zodResolver(createQuizDtoSchema),
  })
  const { setTab } = useTabsUserStore()
  const { opened } = useSnackbarStore()

  async function create(data: CreateQuizDto) {
    try {
      await quizzesService.create(data)
      console.log(data)
      opened('Quiz created!', 'success')
      reset()
      setTab('0')
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
        label="Description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="User ID"
        autoFocus
        type="number"
        inputProps={{
          inputMode: 'numeric',
        }}
        {...register('userId')}
        error={!!errors.userId}
        helperText={errors.userId?.message}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save
      </Button>
    </Box>
  )
}
