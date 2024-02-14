import { create } from 'zustand'

type SnackbarStore = {
  open: boolean
  message: string
  opened: (msg: string) => void
  closened: () => void
}

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  message: '',
  open: false,
  opened: (msg: string) => {
    set({ open: true, message: msg })
  },
  closened: () => {
    set({ open: false, message: '' })
  },
}))
