import { Paper } from '@mui/material'
import { Layout, Tabs, useTabsUserStore } from '../../../components'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { CreateUser } from './create-user'
import { useEffect, useState } from 'react'
import { userService } from '../../../services'
import { User } from '@lib/schema'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'cpf', headerName: 'CPF', flex: 1 },
]

export default function Users() {
  const [rows, setRows] = useState<User[]>([])
  const { tab } = useTabsUserStore()

  useEffect(() => {
    const start = async () => {
      const data = await userService.get(1, 10)
      setRows(data)
    }
    start()
  }, [tab])

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
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowSelection={false}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
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
