import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from '@/lib/auth'

const http_link = createHttpLink({
    uri: process.env.API_URL || 'http://localhost:4000/graphql',
})

const auth_link = setContext((_, { headers }) => {
    const token = getToken()
    
    return {
        headers: {
            ...headers,
            authorization: token || "",
        }
    }
})

export const client = new ApolloClient({
    link: from([auth_link, http_link]),
    cache: new InMemoryCache(),
})
