import { zodResolver } from '@hookform/resolvers/zod'
import { answerQuizDtoSchema, AnswerQuizDto } from '@lib/schema'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { ComponentProps } from '../../../components'
import { Card, CardContent } from '@mui/material'
import { v4 as uuid } from 'uuid'

export const AnswerQuiz: React.FC<ComponentProps<AnswerQuizDto>> = ({
  handleEdit,
  data,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnswerQuizDto>({
    defaultValues: data,
    resolver: zodResolver(answerQuizDtoSchema),
  })

  async function update(dataValidate: AnswerQuizDto) {
    try {
      console.log(dataValidate)
      await handleEdit(dataValidate)
    } catch (error: any) {
      console.error(error.response.data.errors[0])
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
        {data.questions.map((question, index) => (
          <Card key={uuid()}>
            <CardContent>
              <h4>{question.description}</h4>
              <h3>Abswers</h3>
              {question.answers.map((answer) => (
                <p key={uuid()}>{answer.description}</p>
              ))}
              <TextField
                sx={{ display: 'none' }}
                value={question.id}
                {...register(
                  `questions.${index}.answers.${question.answers.length}.questionId` as any,
                  {
                    setValueAs: () => question.id,
                  },
                )}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Answer"
                {...register(
                  `questions.${index}.answers.${question.answers.length}.description` as any,
                )}
                error={(() => {
                  const questionErrors =
                    errors?.questions && errors?.questions[index]
                  const answerErrors =
                    questionErrors?.answers &&
                    questionErrors?.answers[question.answers.length]

                  return !!answerErrors?.description?.message
                })()}
                helperText={(() => {
                  const questionErrors =
                    errors?.questions && errors?.questions[index]
                  const answerErrors =
                    questionErrors?.answers &&
                    questionErrors?.answers[question.answers.length]

                  return answerErrors?.description?.message
                })()}
              />
            </CardContent>
          </Card>
        ))}
      </Card>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Answer
      </Button>
    </Box>
  )
}
