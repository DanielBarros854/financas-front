import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../graphql/mutations/login'
import { handleError } from '../utils/errorHandler'
import { setToken } from '../lib/auth'
import { AuthInput, LoginMutationResponse, LoginMutationVariables } from '../graphql/types/login'

export const useAuthService = () => {
  const [login, { loading, error }] = useMutation<LoginMutationResponse, LoginMutationVariables>(LOGIN_MUTATION)

  const handleLogin = async (data: AuthInput) : Promise<void> => {
    try {
      const { email, password } = data
      
      const result = await login({
        variables: {
          fields: { email, password }
        }
      })

      const token = result.data?.login?.token

      if (!token) {
        throw new Error('Credenciais inválidas!')
      }

      setToken(token)
    } catch {
      handleError(error)
      throw error
    }
  }

  return {
    handleLogin,
    loading,
    error
  }
} 
