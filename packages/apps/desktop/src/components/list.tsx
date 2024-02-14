import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Card,
  IconButton,
  SwipeableDrawer,
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
import React from 'react'
import styled from '@emotion/styled'

type Controller = {
  page: number
  rowsPerPage: number
}

export interface ServiceResponse<T = any> {
  data: T[]
  totalCount: number
}

export interface ListService<T = any> {
  get(page: number, rowsPerPage: number): Promise<ServiceResponse<T>>
  answerQuiz(data: T): Promise<T>
  delete(id: string): Promise<T>
}

type Field = {
  name: string
  field: string
}

type Actions = {
  edit: boolean
  remove: boolean
}

export interface ComponentProps<T = any> {
  handleEdit: (data: T) => Promise<void>
  data: T
}
export type ListProps = {
  service: ListService
  fields: Field[]
  actions?: Actions
  Component: React.FC<ComponentProps>
}

const SwipeableDrawerStyled = styled(SwipeableDrawer)({
  '& .MuiDrawer-paper': {
    overflowY: 'visible',
  },
})

export const List: React.FC<ListProps> = ({
  service,
  fields,
  actions,
  Component,
}) => {
  const [rowEdit, setRowEdit] = useState<any>(null)
  const [anchor, setAnchor] = useState(false)
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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setAnchor(open)
    }

  const handleDelete = (id: string) => async () => {
    try {
      const confirmed = window.confirm('Tem certeza que deseja excluir?')
      if (!confirmed) return

      await service.delete(id)
      const result = await service.get(controller.page, controller.rowsPerPage)
      setRows(result.data)
      setRowsCount(result.totalCount)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (data: any) => {
    try {
      await service.answerQuiz(data)
      const result = await service.get(controller.page, controller.rowsPerPage)
      setRows(result.data)
      setRowsCount(result.totalCount)
      setAnchor(false)
    } catch (error) {
      console.log(error)
    }
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
                      onClick={() => {
                        setRowEdit(row)
                        setAnchor(true)
                      }}
                      aria-label="edit"
                      size="small"
                      sx={{ marginRight: actions.remove ? 2 : 0 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {actions.remove && (
                    <IconButton
                      onClick={handleDelete(row.id)}
                      aria-label="delete"
                      size="small"
                    >
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
      <Card key={uuid()}>
        <Button onClick={toggleDrawer(true)}>{anchor}</Button>
        <SwipeableDrawerStyled
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          }}
          variant="temporary"
          anchor="right"
          open={anchor}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {rowEdit?.id && Component && (
            <Component handleEdit={handleEdit} data={rowEdit} />
          )}
        </SwipeableDrawerStyled>
      </Card>
    </Card>
  )
}
