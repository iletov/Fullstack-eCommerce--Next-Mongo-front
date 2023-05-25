import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function HomePage({ featuredProduct,newProducts }) {
  console.log({newProducts})
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts newProducts={newProducts} />
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '646c727ad856da54779fd76b';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});

  return {
    props: { 
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts)),
    // It must be return as a JSON file, but MongoDB does not use it as JSON.
    // first stringify it and then parse it to use it as an object.
    },
  };
};
