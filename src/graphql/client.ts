import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { getToken, clearToken } from '@/lib/auth'
import { routes } from '@/utils/routes'

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

const error_link = onError(({ graphQLErrors, networkError }) => {
    const hasInvalidTokenGraphQl = graphQLErrors?.some((err) => {
        const message = err.message || ''
        const code = (err.extensions as any)?.code
        return code === 'UNAUTHENTICATED' || /invalid token/i.test(message)
    })

    const hasInvalidTokenNetwork = !!networkError && /401|unauthorized|invalid token/i.test(networkError.message)

    if (hasInvalidTokenGraphQl || hasInvalidTokenNetwork) {
        clearToken()
        if (typeof window !== 'undefined') {
            window.location.href = routes.login
        }
    }
})

export const client = new ApolloClient({
    link: from([error_link, auth_link, http_link]),
    cache: new InMemoryCache(),
})
