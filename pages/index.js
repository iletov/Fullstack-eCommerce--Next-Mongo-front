import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { WishedProducts } from '@/models/WishedProducts';
import { Settings } from '@/models/Settings';
import SearchHome from '@/components/SearchHome';
import { CategoryBox } from '@/components/CategoryBox';
import { Category } from '@/models/Category';
import { CategoryProducts } from '@/components/CategoryProducts';


export default function HomePage({ featuredProduct, newProducts, wishedNewProducts, wishedProducts, mainCategories, categoriesProducts }) {
  // console.log({newProducts})
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <CategoryBox mainCategories={mainCategories} categoriesProducts={categoriesProducts} />
      <SearchHome />
      <CategoryProducts mainCategories={mainCategories} categoriesProducts={categoriesProducts} wishedProducts={wishedProducts}/>
      <NewProducts newProducts={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  )
}

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
  } 
//----------------------------------------------
  const sessionOne = await getServerSession(context.req, context.res, authOptions);
  const wishedProducts = sessionOne?.user 
  ? await WishedProducts.find({
    userEmail: sessionOne.user.email,
    product: allFetchedProductsId,
  }) 
  : [];

  //----------------------------------------------
  const featuredProductSettings = await Settings.findOne({name:'featuredProductId'});
  const featuredProductId = featuredProductSettings.value;;

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:15});
  
  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedNewProducts = session?.user 
  ? await WishedProducts.find({
    userEmail: session.user.email,
    product: newProducts.map((p) => p._id.toString()),  
  }) 
  : [];
  
  return {
    props: { 
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((item) => item.product.toString()),
      //----------------------------------
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((item) => item.product.toString()),
    },
  };
};
