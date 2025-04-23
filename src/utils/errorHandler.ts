import { ApolloError } from '@apollo/client'
import Swal from 'sweetalert2'

export const handleError = (error: unknown, customMessage?: string) => {
  console.error(error)
  
  let message = 'Algo deu errado. Tente novamente.'

  if (error instanceof ApolloError || error instanceof Error) {
    message = error.message
  }

  if (customMessage) {
    message = customMessage
  }

  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: message,
  })
} 
