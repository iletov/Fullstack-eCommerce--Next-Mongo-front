import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';


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
  // console.log({wishedProducts})
  return (
    <>
      <Center>
        <Title> New Products</Title>
       
        <ProductsGrid products={newProducts} wishedProducts={wishedProducts} /> 
      </Center>
      
    </>
  )
}

export default NewProducts