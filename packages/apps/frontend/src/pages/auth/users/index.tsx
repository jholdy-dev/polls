import { Paper } from '@mui/material'
import { Layout, List, Tabs } from '../../../components'
import { CreateUser } from './create-user'
import { userService } from '../../../services'

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
                component: (
                  <List
                    service={userService}
                    Component={() => <h1>OLa</h1>}
                    fields={[
                      { name: 'Id', field: 'id' },
                      { name: 'name', field: 'name' },
                      { name: 'CPF', field: 'cpf' },
                    ]}
                  />
                ),
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
