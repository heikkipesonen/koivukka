import { VFC } from 'react'
import styled from 'styled-components'
import { useGetFilteredProducts } from '../services/get-products'
import { RemoteData } from '../services/remote-data'
import { Product } from './product'

const ProductListC: VFC<{ className?: string; data: ReturnType<typeof useGetFilteredProducts> }> = ({
  className,
  data,
}) => {
  return RemoteData.fold(
    data,
    () => null,
    () => <div>Loading...</div>,
    (list) => (
      <div className={className}>
        {list?.map((x) => (
          <Product data={x} key={x.id} />
        ))}
      </div>
    )
  )
}

export const ProductList = styled(ProductListC)`
  ${Product} {
    margin: 16px;
    display: inline-flex;

    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`
