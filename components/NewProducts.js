import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 20px 0 20px;
  font-weight: normal;
`

const NewProducts = ({ newProducts }) => {
  return (
    <>
      <Center>
        <Title> New Products</Title>
        <ProductsGrid>
          {newProducts?.length > 0 && newProducts?.map((item) => (
            <ProductBox {...item}/>
          ))}
        </ProductsGrid> 
      </Center>
      
    </>
  )
}

export default NewProducts