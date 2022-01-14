import { useStoresList } from '../services/list-stores'

import styled from 'styled-components'
import { RemoteData } from '../services/remote-data'
import { Navigation } from '../views/navigation'
import { FC, useState } from 'react'
import { Stores } from './stores'
import { Field } from './field'
import { useNavigation } from '../services/navigation'

const ViewC: FC<{ className?: string }> = ({ className, children }) => {
  const [storeFilter, setStoreFilter] = useState<string>('')
  const stores = RemoteData.map(useStoresList())(
    (stores) => stores?.filter((x) => x.name.toLowerCase().indexOf(storeFilter.toLowerCase()) > -1) || []
  )
  const navigation = useNavigation()

  return (
    <div className={className}>
      <div className='header'>ÄÄS-kauppa</div>
      <div className='view-content-wrapper'>
        <div className='list'>
          <Field onChange={setStoreFilter} value={storeFilter} />
          <div className='list-content'>
            <Stores data={stores} />
          </div>
        </div>
        <div className='list'>
          <div className='list-content'>
            <Navigation data={navigation} />
          </div>
        </div>

        <div className='view-content'>{children}</div>
      </div>
    </div>
  )
}

export const View = styled(ViewC)`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .view-content-wrapper {
    display: flex;
    flex-direction: row;
    flex: 1;
    overflow: hidden;
  }

  .header {
    color: #00bb3e;
    padding: 16px;
    font-weight: bold;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .list-content {
    overflow-y: auto;
  }

  .view-content {
    flex: 1;

    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }
`
