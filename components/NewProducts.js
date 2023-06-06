import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';
import { Search } from './Search';


const Title = styled.h2`
  font-size: 2rem;
  margin: 20px 0 20px;
  font-weight: normal;
  text-align: center;
  
  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const NewProducts = ({ newProducts }) => {
  return (
    <>
      <Center>
        <Title> New Products</Title>
        <Search />
        <ProductsGrid products={newProducts} /> 
      </Center>
      
    </>
  )
}

export default NewProducts