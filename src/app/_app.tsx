import {AuthContextProvider} from '@/lib/AuthContext'

export default function MyApp({ Component, pageProps }) {
    return 
    (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
  }