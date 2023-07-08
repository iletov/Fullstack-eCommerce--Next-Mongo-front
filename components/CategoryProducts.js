import React from 'react'
import Center from './Center'
import styled from 'styled-components'
import { white } from './Colors';
import ProductBox from './ProductBox';
import { RevealWrapper } from 'next-reveal';
import { HorizontalScroll } from './HorizontalScroll';



const ProductsWrapper = styled.div`
  margin: 40px 0;
`;

const CategoryWrapper = styled.div`
  margin: 0 5px;
`;

// const CategoryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 20px;

//   @media screen and (min-width: 768px) {
//     grid-template-columns: repeat(4, 1fr);
//   }

//   @media screen and (max-width: 466px) {
//     grid-template-columns: repeat(1, 1fr);
//   }
// `;




export const CategoryProducts = ({ mainCategories, categoriesProducts, wishedProducts=[] }) => {
  return (
    <>
      <Center>
      
        <ProductsWrapper>
        <h2>All Products</h2>
        
        {/* <CategoryGrid> */}
       <HorizontalScroll>
        {mainCategories?.map((singleCategory, index) => (
          <RevealWrapper delay={index*100} duration={1200}>
          <CategoryWrapper>
              {categoriesProducts[singleCategory._id].map((product) => (
                
                  <div style={{ minWidth: '200px' }}>
                  <ProductBox key={product._id} {...product} wishedProp={wishedProducts.includes(product._id)} />
                  </div>
                
              ))}
              
          </CategoryWrapper>
          </RevealWrapper>
        ))}
        </HorizontalScroll>
        {/* </CategoryGrid> */}
        

        </ProductsWrapper>
       
      </Center>
    </>
  )
}
