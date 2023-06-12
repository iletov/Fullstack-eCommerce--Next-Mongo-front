import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { WishedProducts } from '@/models/WishedProducts';

export default function HomePage({ featuredProduct, newProducts, wishedNewProducts }) {
  // console.log({newProducts})
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts newProducts={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const featuredProductId = '646c727ad856da54779fd76b';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const { user } = await getServerSession(context.req, context.res, authOptions);
  const wishedNewProducts = await WishedProducts.find({
    userEmail: user.email,
    product: newProducts.map((p) => p._id.toString()),  
  })
  return {
    props: { 
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((item) => item.product.toString()),
    // It must be return as a JSON file, but MongoDB does not use it as JSON.
    // first stringify it and then parse it to use it as an object.
    },
  };
};
