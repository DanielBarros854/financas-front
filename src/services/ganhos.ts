import { useMutation, useQuery } from '@apollo/client'
import { 
  CREATE_GANHO, 
  UPDATE_GANHO, 
  DELETE_GANHO 
} from '../graphql/mutations/ganhos'
import { 
  GET_GANHOS
} from '../graphql/queries/ganhos'
import { handleError } from '../utils/errorHandler'
import { 
  GanhoInput, 
  Ganho, 
  CreateGanhoMutationResponse, 
  CreateGanhoMutationVariables,
  UpdateGanhoMutationResponse,
  UpdateGanhoMutationVariables,
  DeleteGanhoMutationResponse,
  DeleteGanhoMutationVariables,
  GetGanhosQueryResponse
} from '../graphql/types/ganhos'
import { showSuccess } from '@/utils/notifications'

export const useGanhosService = () => {
  const [createGanho, { loading: creating, error: createError }] = useMutation<
    CreateGanhoMutationResponse, 
    CreateGanhoMutationVariables
  >(CREATE_GANHO)

  const [updateGanho, { loading: updating, error: updateError }] = useMutation<
    UpdateGanhoMutationResponse, 
    UpdateGanhoMutationVariables
  >(UPDATE_GANHO)

  const [deleteGanho, { loading: deleting, error: deleteError }] = useMutation<
    DeleteGanhoMutationResponse, 
    DeleteGanhoMutationVariables
  >(DELETE_GANHO)

  const { data: ganhosData, loading: loadingGanhos, error: ganhosError, refetch } = useQuery<
    GetGanhosQueryResponse
  >(GET_GANHOS)

  const handleCreateGanho = async (ganhoData: GanhoInput): Promise<Ganho> => {
    try {
      const result = await createGanho({
        variables: {
          fields: ganhoData
        }
      })

      const newGanho = result.data?.earningAdd

      if (!newGanho) {
        throw new Error('Erro ao criar ganho!')
      }

      await refetch()

      return newGanho
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  const handleUpdateGanho = async (id: string, ganhoData: Partial<GanhoInput>): Promise<Ganho> => {
    try {
      const result = await updateGanho({
        variables: {
          id,
          fields: ganhoData
        }
      })

      const updatedGanho = result.data?.earningUpdate

      if (!updatedGanho) {
        throw new Error('Erro ao atualizar ganho!')
      }

      await refetch()

      return updatedGanho
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  const handleDeleteGanho = async (id: string): Promise<boolean> => {
    try {
      const result = await deleteGanho({
        variables: { id }
      })

      const success = result.data?.earningRemove

      if (!success) {
        throw new Error('Erro ao deletar ganho!')
      }

      await refetch()

      showSuccess('Ganho excluído com sucesso!')

      return true
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  return {
    ganhos: ganhosData?.earnings || [],
    
    loading: loadingGanhos,
    creating,
    updating,
    deleting,

    error: ganhosError,
    createError,
    updateError,
    deleteError,

    handleCreateGanho,
    handleUpdateGanho,
    handleDeleteGanho,
    refetch
  }
}

export const useGanhosBatchService = () => {
  const [createMultipleGanhos, { loading: creatingBatch }] = useMutation(CREATE_GANHO)

  const handleCreateMultipleGanhos = async (ganhosData: GanhoInput[]): Promise<Ganho[]> => {
    try {
      const promises = ganhosData.map(ganhoData =>
        createMultipleGanhos({
          variables: { input: ganhoData }
        })
      )

      const results = await Promise.all(promises)
      const createdGanhos = results.map(result => result.data?.earningAdd).filter(Boolean)

      return createdGanhos as Ganho[]
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  return {
    handleCreateMultipleGanhos,
    creatingBatch
  }
}
