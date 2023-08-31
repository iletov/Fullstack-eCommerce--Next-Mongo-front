import { AllCategories } from '@/components/AllCategories'
import { CategoryBox } from '@/components/CategoryBox'
import Center from '@/components/Center'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
// import ProductsGrid from '@/components/ProductsGrid'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
// import { WishedProducts } from '@/models/WishedProducts'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'
// import { getServerSession } from 'next-auth' 



const ProductsPage = ({allProducts, wishedProducts, mainCategories,categoriesProducts}) => {  
  return (
    <>
    <Header />
      <Center>
        {/* <h1>Products</h1>
        <ProductsGrid products={allProducts} wishedProducts={wishedProducts}/> */}
          <AllCategories mainCategories={mainCategories} categoriesProducts={categoriesProducts} />
      </Center>
    <Footer/>
  </>
  )
}

export default ProductsPage

export async function getServerSideProps(context) {
  await mongooseConnect();

  const categories = await Category.find({});
  const mainCategories = categories.filter((cat) => !cat.parent)

  const categoriesProducts = {}; //catId => [products]
  const allFetchedProductsId = [];

  for (const loopCat of mainCategories) {
    const mainCategoryId = loopCat._id.toString();

    const childCategoryId = categories
      .filter(cat => cat?.parent?.toString() === mainCategoryId)
      .map(cat => cat?._id?.toString());

    const categoriesIds = [mainCategoryId, ...childCategoryId];  
    
    const products = await Product.find(
      {category: categoriesIds}, null, {limit: 1, sort: {'_id': -1}});

    allFetchedProductsId.push(...products.map(prod => prod._id.toString()))
    categoriesProducts[loopCat._id] = products;

  //--------------------------------------
  // const allProducts = await Product.find({}, null, {sort: {'_id': -1}});
  }

  // const session = await getServerSession(context.req, context.res, authOptions);
  // const wishedProducts = session?.user 
  // ? await WishedProducts.find({
  //   userEmail: session.user.email,
  //   product: allProducts.map((p) => p._id.toString()),  
  // })
  // : [];
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      //------------------------------------
      // allProducts: JSON.parse(JSON.stringify(allProducts)),
      // wishedProducts: wishedProducts.map((item) => item.product.toString()),
    }
  }
}