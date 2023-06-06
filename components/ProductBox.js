import React, { useContext } from 'react'
import styled from 'styled-components'
import Button from './StyledBtn';
import CartIcon from './CartIcon';
import Link from 'next/link';
import { black } from './Colors';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  text-decoration: none;
  color: ${black};
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;

  @media screen and (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const {addProduct} = useContext(CartContext)
  const msg = () => {
    toast.success(`${title} added to cart`, {position: 'top-right'})
  }

  const url = '/product/'+_id;
  
  return (

    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt='...' />
        </div>
      </WhiteBox>
        <ProductInfoBox>
          <div>
            <Title href={url}>{title}</Title>
          </div>
          <PriceBox>
            <Price>${price}</Price>
            
            <Button primaryOutline onClick={() => [addProduct(_id), msg()]} ><CartIcon /></Button>
          </PriceBox>
          
        </ProductInfoBox>
        
    </ProductWrapper>
    
  )
}

export default ProductBox