import React from 'react'
import Center from './Center'
import styled from 'styled-components';
import Button from './StyledBtn';
import ButtonLink from './ButtonLink';
import CartIcon from './CartIcon';

const BackGround = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`;

const P = styled.p`
    color: #aaa;
    font-size: .8rem;
`; 

const ColumsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap:40px;
    img {
      max-width: 100%;
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
  return (
    <BackGround>
        <Center>
            <ColumsWrapper>
              <Column>
              <div>
                <Title>{product.title}</Title>
                  <P>{product.description}</P>

                  <ButtonWrapper>
                    <ButtonLink href={'/product/' + product._id }  outline={1} white={1}>Read More</ButtonLink> 
                    <Button primary>
                      <CartIcon />
                      Add to Cart
                    </Button>
                  </ButtonWrapper>
                  
              </div>
              </Column>
              <Column>
              <div>
                <img src='https://letov-next-ecommerce.s3.amazonaws.com/1684828690750.png' alt='...'/>
              </div>
              </Column>
            </ColumsWrapper>
            
        </Center>
    </BackGround>
  )
}

export default Featured