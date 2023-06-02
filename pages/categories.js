import Center from '@/components/Center'
import Header from '@/components/Header'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import React from 'react'

const CategoriesPage = ({ mainCategories, categoriesProducts }) => {
  return (
    <>
      <Header/>
        <Center>
          <h3>Categories</h3>
          {mainCategories?.map((singleCategory, index) => (
            <div key={index}>
              <h4>{singleCategory.name}</h4>
              <div>
                {categoriesProducts[singleCategory._id].map((singleProduct) => (
                  <div>{singleProduct.title}</div>
                ))}
              </div>
            </div>
          ))}
        </Center>
      
    </>
  )
}

export default CategoriesPage

export const getServerSideProps = async () => {
  const categories = await Category.find({});
  const mainCategories = categories.filter((cat) => !cat.parent)
  
  const categoriesProducts = {}; //catId => [products]
  for (const loopCat of mainCategories) {
    const mainCategoryId = loopCat._id.toString();
    const childCategoryId = categories
      .filter(cat => cat?.parent?.toString() === mainCategoryId)
      .map(cat => cat?._id?.toString());

    const categoriesIds = [mainCategoryId, ...childCategoryId];  
    
    const products = await Product.find(
      {category: categoriesIds}, null, {limit: 3, sort: {'_id': -1}});
      
      categoriesProducts[loopCat._id] = products;
  }


  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}