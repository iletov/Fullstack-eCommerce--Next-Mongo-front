import React, { useState ,useContext, useEffect } from 'react'
import styled from 'styled-components'
import Button from './StyledBtn';
import CartIcon from './CartIcon';
import Link from 'next/link';
import { black, boxGrey, dark, white } from './Colors';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';
import { HeartOutline } from './HeartOutline';
import { HeartSolid } from './HeartSolid';
import axios from 'axios';

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
  background-color: ${white};
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;

  img {
    max-width: 100%;
    max-height: 80px;
    transition: ease-in-out .3s;
  }

  :hover img{
    transform: scale(1.15);
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

const HeartButton = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  ${props => props.isWished ? `
    color: red;  
  ` : `
    color: black;
  `}
  cursor: pointer;
  svg {
    width: 16px;
  }
`;

const ProductBox = ({ _id, title, description, price, images, wishedProp=false, onRemoveFromWishlisht=()=>{}, }) => {
  const {addProduct} = useContext(CartContext)
  const [wished, setWished] = useState(wishedProp);

  const adToWishlist = (e) => {
    e.preventDefault();
    const nextValue = !wished;

    if (nextValue === false && onRemoveFromWishlisht) {
      onRemoveFromWishlisht(_id);
    }

    axios.post('/api/wishlist', {product: _id,}).then(() => {});

    setWished(nextValue); //prev => !prev;
  };

  const msg = () => {
    toast.success(`${title} added to cart`, {position: 'top-right'})
  };

  const url = '/product/'+_id;
  
  return (

    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <HeartButton isWished={wished} onClick={adToWishlist}>
            {wished ? <HeartSolid/> : <HeartOutline/>}
          </HeartButton>
          
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