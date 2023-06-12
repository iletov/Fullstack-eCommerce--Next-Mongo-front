import React, { useContext } from 'react'
import Center from './Center'
import styled from 'styled-components';
import Button from './StyledBtn';
import ButtonLink from './ButtonLink';
import CartIcon from './CartIcon';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';
import { dark, grey, white } from './Colors';
import { RevealWrapper } from 'next-reveal';

const BackGround = styled.div`
    background-color: ${dark};
    color: ${white};
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.8rem;

    @media screen and (min-width: 768px) {
      font-size: 3rem;
    }
`;

const P = styled.p`
    color: #aaa;
    font-size: .8rem;
`; 

const ColumsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap:40px;
    
    img {
      max-width: 100%;
      max-height: 200px;
      display: block;
      margin: 0 auto;
    }
    div: nth-child(1) {
      order: 1;
      display: block;
      margin:0 auto;
    }
    

    @media screen and (min-width: 768px) {
      grid-template-columns: 1.1fr 0.9fr;
      div: nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
    }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Featured = ({ product }) => {
  const {addProduct} = useContext(CartContext);

  const addFeaturedToCart = () => {
    addProduct(product._id)
    toast.success(`${product.title} added to cart`, {position: 'top-right'})
  }

  return (
    <BackGround>
        <Center>
            <ColumsWrapper>
              <Column>
              <RevealWrapper delay={150} origin='left'>
              <div>
                <Title>{product.title}</Title>
                  <P>{product.description}</P>

                  <ButtonWrapper>
                    <ButtonLink href={'/product/' + product._id }  outline={1} white={1}>Read More</ButtonLink> 
                    <div>
                    <Button primary={1} onClick={addFeaturedToCart}>
                      <CartIcon />
                      Add to Cart
                    </Button>
                    </div>
                  </ButtonWrapper>
                  
              </div>
              </RevealWrapper>
              </Column>
              <Column>
                <RevealWrapper delay={150} origin='right'> 
                  {/* <img src='https://letov-next-ecommerce.s3.amazonaws.com/1684828690750.png' alt='...'/> */}
                  <img src={product.images?.[1]} alt='...'/>
                </RevealWrapper>
              </Column>
            </ColumsWrapper>
            
        </Center>
    </BackGround>
  )
}

export default Featured