import { gql } from '@apollo/client'

export const GET_GANHOS = gql`
  query earnings {
    earnings {
      id
      name
      value
      date
      created_at
      updated_at
    }
  }
`
