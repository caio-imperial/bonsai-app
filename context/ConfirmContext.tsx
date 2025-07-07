import { createContext, useContext, useState, ReactNode } from 'react'

interface ConfirmOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
}

interface ConfirmContextType {
  showConfirm: (options: ConfirmOptions) => void
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

export function useConfirm() {
  const context = useContext(ConfirmContext)
  if (!context) throw new Error("useConfirm deve ser usado dentro do ConfirmProvider")
  return context
}

import { DialogConfirm } from '@/components/DialogConfirm'

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions>({
    title: '',
    message: '',
    onConfirm: () => {}
  })
  const [open, setOpen] = useState(false)


  const showConfirm = (opts: ConfirmOptions) => {
    setOptions(opts)
    setOpen(true)
  }

  const handleConfirm = () => {
    options.onConfirm()
    setOpen(false)
  }

  const handleClose = () => setOpen(false)

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}
      <DialogConfirm
        open={open}
        setOpen={setOpen}
        title={options.title}
        message={options.message}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </ConfirmContext.Provider>
  )
}
