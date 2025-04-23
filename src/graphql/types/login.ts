export interface AuthInput {
  email: string
  password: string
}

export interface LoginMutationVariables {
  fields: AuthInput
} 

interface LoginResponse {
  token: string
}

export interface LoginMutationResponse {
  login: LoginResponse
}
