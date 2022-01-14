import { useRouter } from 'next/router'
import { useGetFilteredProducts } from '../../services/get-products'
import { ProductList } from '../../views/product-list'

const SearchPage = () => {
  const router = useRouter()
  const query = (router.query ? [router.query.all].flat() : []).join('/')

  return <ProductList data={useGetFilteredProducts(query)} />
}

export default SearchPage
