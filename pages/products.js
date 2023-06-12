import Center from '@/components/Center'
import Header from '@/components/Header'
import ProductsGrid from '@/components/ProductsGrid'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import { WishedProducts } from '@/models/WishedProducts'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth' 


const ProductsPage = ({allProducts, wishedProducts}) => {
  return (
    <>
    <Header />
      <Center>
        <h1>Products</h1>
        <ProductsGrid products={allProducts} wishedProducts={wishedProducts}/>
      </Center>
      
  </>
  )
}

export default ProductsPage

export async function getServerSideProps(context) {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, {sort: {'_id': -1}});
  const { user } = await getServerSession(context.req, context.res, authOptions);
  const wishedProducts = await WishedProducts.find({
    userEmail: user.email,
    product: allProducts.map((p) => p._id.toString()),  
  })
  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
      wishedProducts: wishedProducts.map((item) => item.product.toString()),
    }
  }
}