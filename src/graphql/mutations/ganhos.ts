import { gql } from '@apollo/client'

export const CREATE_GANHO = gql`
  mutation earningAdd($fields: EarningInput!) {
    earningAdd(fields: $fields) {
      id
      name
      value
      date
      created_at
      updated_at
    }
  }
`

export const UPDATE_GANHO = gql`
  mutation earningUpdate($id: Int!, $fields: EarningUpdateInput!) {
    earningUpdate(id: $id, fields: $fields) {
      id
      name
      value
      date
      created_at
      updated_at
    }
  }
`

export const DELETE_GANHO = gql`
  mutation earningRemove($id: Int!) {
    earningRemove(id: $id) {
      removed
    }
  }
` 
