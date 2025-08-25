import Swal from 'sweetalert2'

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: message,
    confirmButtonColor: '#3085d6'
  })
}

export const showError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: message,
    confirmButtonColor: '#3085d6'
  })
}

export const showConfirm = async (options: {
  title: string
  text?: string
  icon?: 'warning' | 'error' | 'info' | 'question'
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: () => void
}) => {
  const result = await Swal.fire({
    title: options.title,
    text: options.text,
    icon: options.icon || 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: options.cancelButtonText || 'Cancelar',
    confirmButtonText: options.confirmButtonText || 'Confirmar',
    width: 'auto',
  })

  if (result.isConfirmed) {
    options.onConfirm?.()
  }
}
