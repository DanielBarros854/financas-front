import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($fields: AuthInput!) {
    login(fields: $fields) {
      token
    }
  }
`
