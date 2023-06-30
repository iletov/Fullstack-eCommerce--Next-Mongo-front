import Center from '@/components/Center'
import React, { useState } from 'react'

import styled from 'styled-components';

import Link from 'next/link';

import { RevealWrapper } from 'next-reveal';
import ProductBox from '@/components/ProductBox'
import { dark, grey, white } from '@/components/Colors'
import ProductsGrid from './ProductsGrid';

const CategoryGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
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
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${dark};
`;

const ShowAllSquare = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 160px; */
  background-color: transparent;
  /* background: rgb(2,24,31); */
  /* background: linear-gradient(87deg, rgba(2,24,31,1) 30%, rgba(5,54,92,1) 70%); */
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1.2rem;
  color: ${dark};
  text-decoration: none;
  p {
    opacity: .8;
  }
`;

const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;


export const Test = ({ mainCategories, categoriesProducts, wishedProducts=[] }) => {
  return (
    <>
      <Center>
          <h3>Products</h3>
          <Wrapper>
 {mainCategories?.map((singleCategory, index) => (
            <CategoryWrapper key={index}>
              
              {/* <CategoryTitle>
                <h2>{singleCategory.name}</h2>
                <div>
                  <StyledLink href={'/category/' + singleCategory._id}>Show All</StyledLink>
                </div>
              </CategoryTitle> */}
                <CategoryGrid>
                  {categoriesProducts[singleCategory._id].map((singleProduct) => (
                    <RevealWrapper delay={index*50} key={singleProduct._id}>
                      <ProductWrap>
                        <ProductBox key={singleProduct._id} {...singleProduct} wishedProp={wishedProducts.includes(singleProduct._id)} />
                      </ProductWrap>
                    </RevealWrapper> 
                  ))}
                  {/* <RevealWrapper delay={50}>
                    <ShowAllSquare href={'/category/' + singleCategory._id}>
                      <p>Show All &rarr;</p>
                    </ShowAllSquare>
                  </RevealWrapper> */}
                </CategoryGrid>
            </CategoryWrapper>
          ))}
          </Wrapper>
         
        
        </Center>
    </>
  )
}
