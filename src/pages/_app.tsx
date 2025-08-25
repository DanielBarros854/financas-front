import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../graphql/client'
import Navbar from '../components/layout/navbar'
import Sidebar from '../components/layout/sidebar'
import { Box } from '@mui/material'
import PrivateRoute from '../components/auth/PrivateRoute'
import { useRouter } from 'next/router'
import '../styles/notifications.css'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isLoginPage = router.pathname === '/login';

    return (
        <ApolloProvider client={client}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {!isLoginPage && <Navbar />}
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    {!isLoginPage && <Sidebar />}
                    <Box component="main" sx={{ 
                        flexGrow: 1, 
                        mt: !isLoginPage ? 8 : 0, 
                        p: 3,
                        transition: 'margin-left 1s ease-in-out',
                    }}>
                        {isLoginPage ? (
                            <Component {...pageProps} />
                        ) : (
                            <PrivateRoute>
                                <Component {...pageProps} />
                            </PrivateRoute>
                        )}
                    </Box>
                </Box>
            </Box>
        </ApolloProvider>
    )
}
