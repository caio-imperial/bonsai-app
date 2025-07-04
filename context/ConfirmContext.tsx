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

import ConfirmModal from '@/components/ConfirmModal'

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({
    title: '',
    message: '',
    onConfirm: () => {}
  })

  const showConfirm = (opts: ConfirmOptions) => {
    setOptions(opts)
    setVisible(true)
  }

  const handleClose = () => setVisible(false)

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}
      <ConfirmModal
        show={visible}
        title={options.title}
        message={options.message}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        onConfirm={() => {
          options.onConfirm()
          handleClose()
        }}
        onClose={handleClose}
      />
    </ConfirmContext.Provider>
  )
}
