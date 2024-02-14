import DeleteIcon from '@mui/icons-material/Delete'
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import EditIcon from '@mui/icons-material/Edit'

type Controller = {
  page: number
  rowsPerPage: number
}

export interface ServiceResponse {
  data: any[]
  totalCount: number
}

type Service = {
  get(page: number, rowsPerPage: number): Promise<ServiceResponse>
}

type Field = {
  name: string
  field: string
}

type Actions = {
  edit: boolean
  remove: boolean
}

export type ListProps = {
  service: Service
  fields: Field[]
  actions?: Actions
}

export const List: React.FC<ListProps> = ({ service, fields, actions }) => {
  const [rows, setRows] = useState<any[]>([])
  const [rowsCount, setRowsCount] = useState(0)
  const [controller, setController] = useState<Controller>({
    page: 0,
    rowsPerPage: 10,
  })

  useEffect(() => {
    const start = async () => {
      try {
        const result = await service.get(
          controller.page,
          controller.rowsPerPage,
        )
        console.log(result)
        setRows(result.data)
        setRowsCount(result.totalCount)
      } catch (error) {
        console.log(error)
      }
    }
    start()
  }, [controller, service])

  const handlePageChange = (_event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    })
  }

  const handleChangeRowsPerPage = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    })
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={uuid()}>{field.name}</TableCell>
            ))}
            {(actions?.edit || actions?.remove) && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={uuid()}>
              {fields.map((field) => (
                <TableCell key={uuid()}>{row[field.field]}</TableCell>
              ))}
              {(actions?.edit || actions?.remove) && (
                <TableCell align="right">
                  {actions.edit && (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{ marginRight: actions.remove ? 2 : 0 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {actions.remove && (
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={rowsCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}
