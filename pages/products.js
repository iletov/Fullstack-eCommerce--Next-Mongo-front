import Center from '@/components/Center'
import Header from '@/components/Header'
import ProductsGrid from '@/components/ProductsGrid'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'


const ProductsPage = ({allProducts}) => {
  return (
    <>
    <Header />
      <Center>
        <h1>Products</h1>
        <ProductsGrid products={allProducts}/>
      </Center>
      
  </>
  )
}

export default ProductsPage

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, {sort: {'_id': -1}});

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}