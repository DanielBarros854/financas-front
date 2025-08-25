import { ApolloError } from '@apollo/client'
import { showError } from './notifications'

export const handleError = (error: unknown, customMessage?: string) => {
  console.error(error)
  
  let message = 'Algo deu errado. Tente novamente.'

  if (error instanceof ApolloError || error instanceof Error) {
    message = error.message
  }

  if (customMessage) {
    message = customMessage
  }

  showError(message)
} 
