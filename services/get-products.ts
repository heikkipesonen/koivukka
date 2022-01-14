import { gql, useQuery } from '@apollo/client'
import { RemoteData } from './remote-data'
import { useSelectedStoreId } from './selected-store'

const ProductFields = gql`
  fragment ProductFields on Product {
    id
    ean
    name
    price
    basicQuantityUnit
    priceUnit
    quantityMultiplier
    imageUrl
  }
`
export interface ProductFields {
  id: string
  ean: string
  name: string
  price: number
  basicQuantityUnit: string
  priceUnit: string
  quantityMultiplier: number
  imageUrl: string
}

const Query = gql`
  ${ProductFields}

  query GetFilteredProducts($storeId: ID!, $slug: String) {
    store(id: $storeId) {
      id
      products(slug: $slug) {
        items {
          ...ProductFields
        }
      }
    }
  }
`

interface StoreProducts {
  store: {
    products: {
      items: ProductFields[]
    }
  }
}

export const useGetFilteredProducts = (filter: string) => {
  const storeId = useSelectedStoreId()
  return RemoteData.map(
    RemoteData.query(
      useQuery<StoreProducts>(Query, {
        variables: {
          storeId,
          queryString: '',
          slug: filter,
        },
        skip: !storeId,
      })
    )
  )((x) => x?.store.products.items || [])
}
