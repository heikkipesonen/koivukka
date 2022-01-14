import { useStoresList } from '../services/list-stores'
import { useSelectedStoreId, useSetSelectedStore } from '../services/selected-store'
import styled from 'styled-components'
import { RemoteData } from '../services/remote-data'
import { VFC } from 'react'
import classNames from 'classnames'

const StoresC: VFC<{ className?: string; data: ReturnType<typeof useStoresList> }> = ({ className, data }) => {
  const fart = useSetSelectedStore()
  const storeId = useSelectedStoreId()

  return (
    <div className={className}>
      {RemoteData.fold(
        data,
        () => null,
        () => null,
        (stores) =>
          stores?.map((store) => (
            <div
              key={store.id}
              onClick={() => fart(store.id)}
              className={classNames('stores--item', { '--selected': store.id === storeId })}
            >
              {store.name}
            </div>
          ))
      )}
    </div>
  )
}

export const Stores = styled(StoresC)`
  .stores--item {
    padding: 8px;
    border-bottom: 1px solid #eee;

    &.--selected {
      font-weight: bold;
      background-color: #eee;
    }
  }
`
