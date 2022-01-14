import { gql, useQuery } from '@apollo/client'
import { Store } from '../domain/store'
import { RemoteData } from './remote-data'

const Query = gql`
  query GetStores {
    stores {
      id
      name
      city
      latitude
      longitude
    }
  }
`

export const useStoresList = () =>
  RemoteData.map(RemoteData.query(useQuery<{ stores: Store[] }>(Query)))((x) => x?.stores || [])
