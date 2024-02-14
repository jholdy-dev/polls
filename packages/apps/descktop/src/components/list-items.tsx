import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PeopleIcon from '@mui/icons-material/People'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { useNavigate } from 'react-router-dom'

export const MainListItems: React.FC = () => {
  const navigate = useNavigate()

  const goToUsers = () => {
    navigate('/dashboard/users')
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={goToUsers}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Quizzes" />
      </ListItemButton>
    </React.Fragment>
  )
}
