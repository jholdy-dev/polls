import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { useNavigate } from 'react-router-dom'

export const MainListItems: React.FC = () => {
  const navigate = useNavigate()

  const goToQuizzes = () => {
    navigate('/dashboard/quizzes')
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={goToQuizzes}>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Quizzes" />
      </ListItemButton>
    </React.Fragment>
  )
}
