import { useState, useEffect } from 'react'
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material'
import { v4 as uuid } from 'uuid'

type Controller = {
  page: number
  rowsPerPage: number
}

export interface ServiceResponse {
  data: any[]
  totalCount: number
}

export type ListProps = {
  service: {
    get(page: number, rowsPerPage: number): Promise<ServiceResponse>
  }
  fields: {
    name: string
    field: string
  }[]
}

export const List: React.FC<ListProps> = ({ service, fields }) => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={uuid()}>
              {fields.map((field) => (
                <TableCell key={uuid()}>{row[field.field]}</TableCell>
              ))}
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
