import { gql, useQuery } from '@apollo/client'
import { RemoteData } from './remote-data'

const Query = gql`
  query deliveryAreaPins($domains: [Domain!]) {
    deliveryAreaPins(domains: $domains) {
      pins {
        areaId
        placeOfBusinessId
        location {
          latitude
          longitude
        }
      }
    }
  }
`
interface Pin {
  areaId: string
  placeOfBusinessId: string
  location: {
    latitude: string
    longitude: string
  }
}

export const useDeliveryAreaPins = () =>
  RemoteData.map(
    RemoteData.query(
      useQuery<{ deliveryAreaPins: { pins: Pin[] } }>(Query, {
        variables: { brand: 'S_KAUPAT' },
      })
    )
  )((x) => x?.deliveryAreaPins.pins || [])
