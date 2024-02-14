import { create } from 'zustand'

type TypeMessage = 'success' | 'error' | 'warning' | 'info'

type SnackbarStore = {
  open: boolean
  message: string
  typeMessage: TypeMessage
  opened: (msg: string, typeMessage: TypeMessage) => void
  closened: () => void
}

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  message: '',
  open: false,
  typeMessage: 'info',
  opened: (msg: string, typeMessage: TypeMessage) => {
    set({ open: true, message: msg, typeMessage })
  },
  closened: () => {
    set({ open: false, message: '' })
  },
}))
