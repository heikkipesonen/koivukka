import { VFC } from 'react'
import styled from 'styled-components'
import { ProductFields } from '../services/get-products'

const ProductC: VFC<{ className?: string; data: ProductFields }> = ({ className, data }) => {
  return (
    <div className={className}>
      <div className='image-container'>
        <img src={data.imageUrl.replace('400', '128')} alt={data.name} />
      </div>
      <h4>{data.name}</h4>
      <h5>{data.price}</h5>
    </div>
  )
}

export const Product = styled(ProductC)`
  text-align: center;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 200px;

  .image-container {
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  img {
    max-width: 128px;
  }

  h4,
  h5 {
    margin: 0;
    padding: 0;
  }

  h4 {
    font-size: 0.8rem;
    padding: 8px 0;
  }

  h5 {
    font-size: 1.2rem;
    padding: 8px 0;
  }
`
