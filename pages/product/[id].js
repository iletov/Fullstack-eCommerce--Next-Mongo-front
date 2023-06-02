import Box from '@/components/Box';
import { CartContext } from '@/components/CartContext';
import CartIcon from '@/components/CartIcon';
import Center from '@/components/Center'
import { white } from '@/components/Colors';
import Header from '@/components/Header'
import ProductImages from '@/components/ProductImages';
import Button from '@/components/StyledBtn';
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import Image from 'next/image';
import { useContext } from 'react';
import styled from 'styled-components';

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
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

const ProductPage = ({ details }) => {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          
          <Box>
            <ProductImages images={details.images} />
          </Box>
          <div>
            <h3>{details.title}</h3>
            <p>{details.description}</p>

            <PriceRow>
              <div>
                <Price>${details.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(details._id)}><CartIcon/>Add to Cart</Button>
              </div>              
            </PriceRow>
            
          </div>
          
        </ColWrapper>
      </Center>
    </>
  )
}

export default ProductPage;

export async function getServerSideProps(context) {
  await mongooseConnect();
  // console.log({query:context.query})
  const { id } = context.query;
  const details = await Product.findById(id)

  return {
    props: {
      details: JSON.parse(JSON.stringify(details)),
    }
  }
};