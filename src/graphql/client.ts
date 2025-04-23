import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const http_link = createHttpLink({
    uri: process.env.API_URL || 'http://localhost:4000/graphql',
})

export const client = new ApolloClient({
    link: http_link,
    cache: new InMemoryCache(),
})
