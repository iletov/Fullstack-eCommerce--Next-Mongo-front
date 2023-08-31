import React, { useContext } from 'react'
import Center from './Center'
import styled from 'styled-components';
import Button from './StyledBtn';
import ButtonLink from './ButtonLink';
import CartIcon from './CartIcon';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';
import { background, dark, white } from './Colors';
import { RevealWrapper } from 'next-reveal';


const BackGround = styled.div`
  background: linear-gradient(87deg, rgba(180, 181, 171, 1) 50%, rgba(232, 233, 2223, 1) 100%);
  padding: 75px 0 50px 0;
  color: ${dark};
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
    color: ${dark};
    font-size: .8rem;
`; 

const ColumsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap:40px;
    
    img {
      max-width: 100%;
      max-height: 350px;
      display: block;
      margin: 0 auto;
    }
    div: nth-child(1) {
      order: 1;
      display: block;
      margin:0 auto;
    }
    

    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      div: nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
      max-height: 300px;
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

const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Featured = ({ product }) => {
  const {addProduct} = useContext(CartContext);

  const addFeaturedToCart = () => {
    addProduct(product._id)
    toast.success(`${product.title} added to cart`, {position: 'top-right'})
  };

  return (
    <BackGround>

        <Center>
            <ColumsWrapper>
              <Column>
              <RevealWrapper delay={0} origin='left'>
              <div>
                <Title>{product.title}</Title>
                  <P>{product.description}</P>

                  <ButtonWrapper>
                    <ButtonLink outlinedark='true' href={'/product/' + product._id }>Read More</ButtonLink> 
                    <div>
                    <Button primary onClick={addFeaturedToCart}>
                      <CartIcon />
                      Add to Cart
                    </Button>
                    </div>
                  </ButtonWrapper>
                  
              </div>
              </RevealWrapper>
              </Column>
              <Column>
                <RevealWrapper delay={0} origin='right'> 
                  <CenterImg >
                    <img src={product.images?.[0]} alt='...'/>
                  </CenterImg>
                </RevealWrapper>
              </Column>
            </ColumsWrapper>
            
        </Center>
    </BackGround>
  )
}

export default Featured