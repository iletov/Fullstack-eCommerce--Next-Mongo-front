import React from 'react'
import Center from './Center'
import styled from 'styled-components';
import Button from './StyledBtn';
import ButtonLink from './ButtonLink';

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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
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