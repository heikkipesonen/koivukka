import { gql, useQuery } from '@apollo/client'
import React, { createContext, useContext, useState } from 'react'
import { RemoteData } from './remote-data'

const Query = gql`
  query GetStore($id: ID!) {
    store(id: $id) {
      id
      name
      availablePaymentMethods
    }
  }
`
interface Store {
  id: string
  name: string
  availablePaymentMethods: string[]
}

const selectedStoreContext = createContext<{
  id: string | null
  set: (id: string) => void
} | null>(null)

export const SelectedStoreCtx: React.FC = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)

  return (
    <selectedStoreContext.Provider value={{ id: selectedStore, set: setSelectedStore }}>
      {children}
    </selectedStoreContext.Provider>
  )
}

export const useSelectedStore = () => {
  const ctx = useContext(selectedStoreContext)
  if (!ctx) {
    throw new Error('Must be inside <SelectedStoreCtx>')
  }

  return RemoteData.map(
    RemoteData.query(useQuery<{ store: Store }>(Query, { variables: { id: `${ctx.id}` }, skip: !ctx.id }))
  )((x) => x?.store || null)
}

export const useSetSelectedStore = () => {
  const ctx = useContext(selectedStoreContext)
  if (!ctx) {
    throw new Error('Must be inside <SelectedStoreCtx>')
  }

  return ctx.set
}

export const useSelectedStoreId = () => {
  const ctx = useContext(selectedStoreContext)
  if (!ctx) {
    throw new Error('Must be inside <SelectedStoreCtx>')
  }

  return ctx.id
}
