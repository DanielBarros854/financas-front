export interface Ganho {
  id: string
  name: string
  value: number
  date: string
  created_at: string
  updated_at: string
}

export interface GanhoInput {
  name: string
  value: number
  date: string
}

export interface GetGanhosQueryResponse {
  earnings: Ganho[]
}

export interface CreateGanhoMutationResponse {
  earningAdd: Ganho
}

export interface CreateGanhoMutationVariables {
  fields: GanhoInput
}

export interface UpdateGanhoMutationResponse {
  earningUpdate: Ganho
}

export interface UpdateGanhoMutationVariables {
  id: string
  fields: Partial<GanhoInput>
}

export interface DeleteGanhoMutationResponse {
  earningRemove: boolean
}

export interface DeleteGanhoMutationVariables {
  id: string
} 
