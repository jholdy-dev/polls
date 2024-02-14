import { zodResolver } from '@hookform/resolvers/zod'
import { answerQuizDtoSchema, AnswerQuizDto } from '@lib/schema'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFieldArray, useForm } from 'react-hook-form'
import { ComponentProps } from '../../../components'
import { Card, CardContent } from '@mui/material'
import { v4 as uuid } from 'uuid'

export const AnswerQuiz: React.FC<ComponentProps<AnswerQuizDto>> = ({
  data,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AnswerQuizDto>({
    defaultValues: data,
    resolver: zodResolver(answerQuizDtoSchema),
  })

  const { fields } = useFieldArray({
    control,
    name: 'questions',
  })

  console.log('ERROR =>', errors)

  async function update(dataValidate: AnswerQuizDto) {
    try {
      console.log('DATA: ', dataValidate)
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
      sx={{ mt: 8, p: 2, width: 600 }}
    >
      <h2>Quiz</h2>
      <h3>Name: {data.name}</h3>
      <strong>Description: {data.description}</strong>
      <Card sx={{ p: 2, mt: 4 }}>
        <h3>Questions</h3>
        {fields.map((question, index) => (
          <Card key={uuid()}>
            <CardContent>
              <h4>{question.description}</h4>
              <TextField
                sx={{ display: 'none' }}
                value={question.id}
                {...register(`questions.${index}.answers.questionId` as any, {
                  setValueAs: (value) => parseInt(value),
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Answer"
                {...register(`questions.${index}.answers.message` as any)}
                error={!!errors.questions?.[index]?.answers?.message}
                helperText={errors.questions?.[index]?.answers?.message}
              />
            </CardContent>
          </Card>
        ))}
      </Card>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Edit
      </Button>
    </Box>
  )
}
