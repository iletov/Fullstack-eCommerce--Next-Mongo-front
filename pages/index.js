import Featured from '@/components/Featured'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function HomePage({product}) {
  return (
    <div>
      <Header />
      <Featured product={product}/>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '646c727ad856da54779fd76b';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);

  return {
    props: {product: JSON.parse(JSON.stringify(product))},
    // It must be return as a JSON file, but MongoDB does not use it as JSON.
    // first stringify it and then parse it to use it as an object.
  };
};
