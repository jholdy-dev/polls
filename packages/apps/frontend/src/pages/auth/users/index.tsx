import { Paper } from '@mui/material'
import { Layout, Tabs } from '../../../components'
import { CreateUser } from './create-user'
import { UserList } from './user-list'

export default function Users() {
  return (
    <Layout>
      <div>
        <h1>User</h1>
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
                component: <UserList />,
              },
              {
                labels: 'Create',
                component: <CreateUser />,
              },
            ]}
          />
        </Paper>
      </div>
    </Layout>
  )
}
