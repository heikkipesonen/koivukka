import { gql, useQuery } from '@apollo/client'
import { RemoteData } from './remote-data'
import { useSelectedStoreId } from './selected-store'

const NavigationQuery = gql`
  fragment DILDOSHAGGINS on NavigationItem {
    id
    name
    slug
    itemCount
  }

  query GetStoreNavigation($id: ID!) {
    store(id: $id) {
      id
      navigation {
        children {
          ...DILDOSHAGGINS
          children {
            ...DILDOSHAGGINS
            children {
              ...DILDOSHAGGINS
              children {
                ...DILDOSHAGGINS
              }
            }
          }
        }
        id
        name
        slug
      }
    }
  }
`
export interface NavigationItem {
  children: NavigationItem[]
  id: string
  name: string
  slug: string
  itemCount: number
}

export const useNavigation = () => {
  const storeId = useSelectedStoreId()

  return RemoteData.map(
    RemoteData.query(
      useQuery<{ store: { navigation: NavigationItem[] } }>(NavigationQuery, {
        variables: { id: `${storeId}` },
        skip: !storeId,
      })
    )
  )((x) => x?.store.navigation)
}
