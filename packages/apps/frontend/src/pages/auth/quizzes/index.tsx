import { CreateQuizDto } from '@lib/schema'
import { Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Layout, Tabs, useTabsUserStore } from '../../../components'
import { quizzesService } from '../../../services'
import { CreateQuiz } from './create-quiz'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'description', flex: 1 },
]

export default function Quizzes() {
  const [rows, setRows] = useState<CreateQuizDto[]>([])
  const { tab } = useTabsUserStore()

  useEffect(() => {
    const start = async () => {
      const data = await quizzesService.get(1, 10)
      setRows(data)

      console.log(data)
    }
    start()
  }, [tab])

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
                component: <CreateQuiz />,
              },
            ]}
          />
        </Paper>
      </div>
    </Layout>
  )
}
