import { useEffect, useRef } from "react"

interface ConfirmModalProps {
  show: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onClose: () => void
}

const isClient = typeof window !== 'undefined'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Modal: any = null

if (isClient) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Modal = require('bootstrap').Modal
}

export default function ConfirmModal({
  show,
  title = "Tem certeza?",
  message = "Essa ação não poderá ser desfeita.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const bsModal = useRef<typeof Modal | null>(null)

  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new Modal(modalRef.current)
    }
  }, [])

  useEffect(() => {
    if (show && bsModal.current) {
      bsModal.current.show()
    } else if (bsModal.current) {
      bsModal.current.hide()
    }
  }, [show])

  return (
    <div
      className="modal fade"
      tabIndex={-1}
      ref={modalRef}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose()
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-danger"
              onClick={() => {
                onConfirm()
                onClose()
              }}
            >
              {confirmText}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
