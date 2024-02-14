import { Button, Paper } from '@mui/material'
import { Layout, Tabs } from '../../../components'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'cpf', headerName: 'CPF', flex: 1 },
]

const rows = [
  { id: 1, name: 'Snow', cpf: '00.000.000-00' },
  { id: 2, name: 'Lannister', cpf: '00.000.000-00' },
  { id: 3, name: 'Lannister', cpf: '00.000.000-00' },
  { id: 4, name: 'Stark', cpf: '00.000.000-00' },
  { id: 5, name: 'Targaryen', cpf: '00.000.000-00' },
]

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
                  <DataGrid
                    rows={rows}
                    columns={[
                      ...columns,
                      {
                        field: 'actions',
                        headerName: 'Actions',
                        flex: 1,
                        renderCell: (value) => {
                          return (
                            <div>
                              <Button
                                variant="contained"
                                sx={{ mr: 4 }}
                                onClick={() => {
                                  console.log('edit', { value })
                                }}
                                endIcon={<EditIcon />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  console.log('delete', { value })
                                }}
                                startIcon={<DeleteForeverIcon />}
                              >
                                Delete
                              </Button>
                            </div>
                          )
                        },
                      },
                    ]}
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
                component: <div>create</div>,
              },
            ]}
          />
        </Paper>
      </div>
    </Layout>
  )
}
