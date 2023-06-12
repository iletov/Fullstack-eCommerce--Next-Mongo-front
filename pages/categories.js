import Center from '@/components/Center'
import { black, dark, grey, primary } from '@/components/Colors'
import Header from '@/components/Header'
import ProductBox from '@/components/ProductBox'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { WishedProducts } from '@/models/WishedProducts'
import { mongooseConnect } from '@/lib/mongoose'


const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 0px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${dark};
`;

const ShowAllSquare = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: ${grey};
  color: ${dark};
  text-decoration: none;
`;

const CategoriesPage = ({ mainCategories, categoriesProducts, wishedProducts=[] }) => {
  return (
    <>
      <Header/>
        <Center>
          <h3>Categories</h3>
          {mainCategories?.map((singleCategory, index) => (
            <CategoryWrapper key={index}>
              <CategoryTitle>
                <h2>{singleCategory.name}</h2>
                <div>
                  <StyledLink href={'/category/' + singleCategory._id}>Show All</StyledLink>
                </div>
              </CategoryTitle>
              
              <CategoryGrid>
                {categoriesProducts[singleCategory._id].map((singleProduct) => (
                  <ProductBox {...singleProduct} wishedProp={wishedProducts.includes(singleProduct._id)} />
                ))}
                <ShowAllSquare href={'/category/' + singleCategory._id}>
                    Show All &rarr;
                </ShowAllSquare>
              </CategoryGrid>
            </CategoryWrapper>
          ))}
        </Center>
      
    </>
  )
}

export default CategoriesPage

export const getServerSideProps = async (context) => {
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
      {category: categoriesIds}, null, {limit: 3, sort: {'_id': -1}});
    
    allFetchedProductsId.push(...products.map(prod => prod._id.toString()))
    categoriesProducts[loopCat._id] = products;
  }

  console.log(allFetchedProductsId);

  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProducts = session?.user 
  ? await WishedProducts.find({
    userEmail: session.user.email,
    product: allFetchedProductsId,
  }) 
  : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((item) => item.product.toString()),
    },
  };
}