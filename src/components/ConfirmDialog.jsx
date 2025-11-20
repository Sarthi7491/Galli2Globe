import { useEffect } from 'react'

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning' // 'warning', 'danger', 'info', 'success'
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return '⚠️'
      case 'warning':
        return '❓'
      case 'success':
        return '✓'
      case 'info':
        return 'ℹ️'
      default:
        return '❓'
    }
  }

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-danger'
      case 'warning':
        return 'btn-primary'
      case 'success':
        return 'btn-primary'
      case 'info':
        return 'btn-secondary'
      default:
        return 'btn-primary'
    }
  }

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog-backdrop" onClick={onClose}></div>
      <div className={`confirm-dialog ${type}`}>
        <div className="confirm-dialog-icon">
          {getIcon()}
        </div>
        <div className="confirm-dialog-content">
          <h3 className="confirm-dialog-title">{title}</h3>
          <p className="confirm-dialog-message">{message}</p>
        </div>
        <div className="confirm-dialog-actions">
          <button 
            className="btn btn-outline" 
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`btn ${getButtonClass()}`}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
