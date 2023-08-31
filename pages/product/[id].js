import Box from '@/components/Box';
import { CartContext } from '@/components/CartContext';
import CartIcon from '@/components/CartIcon';
import Center from '@/components/Center'
import { white } from '@/components/Colors';
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import ProductImages from '@/components/ProductImages';
import { Reviews } from '@/components/Reviews';
import Button from '@/components/StyledBtn';
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import Image from 'next/image';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Price = styled.span`
  font-size: 1.5rem;
`;

const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);

return (
    <>
      <Header />
      <Center>
        <ColWrapper>   
          <Box>
            <ProductImages images={product.images} />
          </Box>
          <div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
                  
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}><CartIcon/>Add to Cart</Button>
              </div>              
            </PriceRow>
          </div>
        </ColWrapper>
        <Reviews product={product} />
      </Center>
      <Footer/>
    </>
  )
}

export default ProductPage;

export async function getServerSideProps(context) {
  await mongooseConnect();
  // console.log({query:context.query})
  const { id } = context.query;
  const product = await Product.findById(id)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
};