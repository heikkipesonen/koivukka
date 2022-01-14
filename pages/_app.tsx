import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { SelectedStoreCtx } from '../services/selected-store'
import { View } from '../views/view'

const client = new ApolloClient({
  uri: 'https://cfapi.voikukka.fi/graphql',
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SelectedStoreCtx>
        <View>
          <Component {...pageProps} />
        </View>
      </SelectedStoreCtx>
    </ApolloProvider>
  )
}

export default MyApp
