import { zodResolver } from '@hookform/resolvers/zod'
import { CreateQuizDto, createQuizDtoSchema } from '@lib/schema'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSnackbarStore, useTabsUserStore } from '../../stores'
import { quizzesService } from '../../services'
import { Card, CardContent, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuid } from 'uuid'

export function CreateQuiz() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateQuizDto>({
    resolver: zodResolver(createQuizDtoSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
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
        {...register('userId', {
          setValueAs: (value) => Number(value),
        })}
        error={!!errors.userId}
        helperText={errors.userId?.message}
      />
      <Card sx={{ p: 2 }}>
        <h3>Questions</h3>
        {fields.map((_, index) => (
          <Card key={uuid()}>
            <CardContent>
              <h4>Edit Question</h4>
              <TextField
                margin="normal"
                required
                fullWidth
                label="description"
                {...register(`questions.${index}.description` as any)}
              />
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                alignSelf: 'stretch',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}
            >
              <Button
                onClick={() => remove(index)}
                aria-label="delete"
                variant="outlined"
                color="error"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </CardActions>
          </Card>
        ))}
        <CardActions>
          <Button
            onClick={() => append({ description: '', id: 0 })}
            aria-label="add"
            variant="contained"
            color="success"
            size="small"
          >
            <AddIcon fontSize="small" />
          </Button>
        </CardActions>
      </Card>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save
      </Button>
    </Box>
  )
}
