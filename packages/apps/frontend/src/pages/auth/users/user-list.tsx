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
import { User } from '@lib/schema'
import { v4 as uuid } from 'uuid'
import { userService } from '../../../services'

interface UserID extends User {
  id?: number
}

type Controller = {
  page: number
  rowsPerPage: number
}

export const UserList = () => {
  const [rows, setRows] = useState<UserID[]>([])
  const [rowsCount, setRowsCount] = useState(0)
  const [controller, setController] = useState<Controller>({
    page: 0,
    rowsPerPage: 2,
  })

  useEffect(() => {
    const start = async () => {
      try {
        const result = await userService.get(
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
  }, [controller])

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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>CPF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user) => (
            <TableRow key={uuid()}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.cpf}</TableCell>
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
