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

export default function HomePage({ featuredProduct, newProducts, wishedNewProducts, mainCategories, singleCategoryProduct }) {
  // console.log({newProducts})
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <CategoryBox mainCategories={mainCategories} singleCategoryProduct={singleCategoryProduct} />
      <SearchHome />
      <NewProducts newProducts={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  )
}

export async function getServerSideProps(context) {

  const categories = await Category.find({});
  const mainCategories = categories.filter((cat) => !cat.parent)

  const singleCategoryProduct = {};
  const allSingleFetchedProductsId = [];

  for (const loopCat of mainCategories) {
    const mainCategoryId = loopCat._id.toString();

    const childCategoryId = categories
      .filter(cat => cat?.parent?.toString() === mainCategoryId)
      .map(cat => cat?._id?.toString());

    const categoriesIds = [mainCategoryId, ...childCategoryId];  
    
    const singleProduct = await Product.find(
      {category: categoriesIds}, null, {limit: 1, sort: {'_id': -1}} )
    
    allSingleFetchedProductsId.push(...singleProduct.map(item => item._id.toString()))
    singleCategoryProduct[loopCat._id] = singleProduct;
  } 

  //----------------------------------------------
  const featuredProductSettings = await Settings.findOne({name:'featuredProductId'});
  const featuredProductId = featuredProductSettings.value;;
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
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
      singleCategoryProduct: JSON.parse(JSON.stringify(singleCategoryProduct)),
    },
  };
};
