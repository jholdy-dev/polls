import { Paper } from '@mui/material'
import { Layout, List, Tabs } from '../../../components'
import { quizzesService } from '../../../services'
import { CreateQuiz } from './create-quiz'

export default function Quizzes() {
  return (
    <Layout>
      <div>
        <h1>Quizzes</h1>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Tabs
            tabs={[
              {
                labels: 'List',
                component: (
                  <List
                    service={quizzesService}
                    Component={() => <h1>OLa</h1>}
                    fields={[
                      { name: 'Id', field: 'id' },
                      { name: 'Name', field: 'name' },
                      { name: 'Description', field: 'description' },
                    ]}
                    actions={{ edit: true, remove: true }}
                  />
                ),
              },
              {
                labels: 'Create',
                component: <CreateQuiz />,
              },
            ]}
          />
        </Paper>
      </div>
    </Layout>
  )
}
