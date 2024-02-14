import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateQuizDto, updateQuizDtoSchema } from '@lib/schema'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { ComponentProps } from '../../../components'
import { Card, CardContent, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuid } from 'uuid'

export const UpdateQuiz: React.FC<ComponentProps<UpdateQuizDto>> = ({
  handleEdit,
  data,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateQuizDto>({
    resolver: zodResolver(updateQuizDtoSchema),
  })

  async function update(dataValidate: UpdateQuizDto) {
    try {
      await handleEdit(dataValidate)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(update)}
      noValidate
      sx={{ mt: 8, p: 2 }}
    >
      <h2>Edit Quiz</h2>
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

      <Card sx={{ p: 2 }}>
        <h3>Questions</h3>
        {data.questions.map((question) => (
          <Card key={uuid()}>
            <CardContent>
              <h4>Edit Question</h4>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Question"
                value={question.description}
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
        Edit
      </Button>
    </Box>
  )
}