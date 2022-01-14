import React from 'react'
import styled from 'styled-components'
import { RemoteData } from '../services/remote-data'
import { useSelectedStore } from '../services/selected-store'

const SelectedStoreC: React.VFC<{ className?: string }> = ({ className }) => {
  const storeData = useSelectedStore()

  return RemoteData.fold(
    storeData,
    () => null,
    () => <div>Loading...</div>,
    (store) => (
      <div className={className}>
        <h4>{store?.name}</h4>
      </div>
    )
  )
}

export const SelectedStoreView = styled(SelectedStoreC)``
