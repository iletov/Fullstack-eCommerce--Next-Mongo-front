import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';
import { RevealWrapper } from 'next-reveal';
import { CartContext } from './CartContext';

const ProductsWrapp = styled.div`
  margin: 40px 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 20px 0 20px;
  font-weight: normal;
  text-align: center;
  
  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const NewProducts = ({ newProducts, wishedProducts }) => {
  const { carousel, setCarousel } = useContext(CartContext);

  
  useEffect(() => {
    setCarousel(true);
  },[])
    
  return (
    <>
      <Center>
        <ProductsWrapp>
        <h2> New Products</h2>
        <ProductsGrid products={newProducts} wishedProducts={wishedProducts} carousel={carousel} /> 
      </ProductsWrapp>
      </Center>
      
    </>
  )
}

export default NewProducts