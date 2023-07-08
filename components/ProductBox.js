import React, { useState ,useContext, useEffect } from 'react'
import styled from 'styled-components'
import Button from './StyledBtn';
import CartIcon from './CartIcon';
import Link from 'next/link';
import { black, boxGrey, dark, darkgrey, grey, lightGray, price, primary, white } from './Colors';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';
import { HeartOutline } from './HeartOutline';
import { HeartSolid } from './HeartSolid';
import axios from 'axios';

const ProductWrapper = styled.div`
  background-color: ${white};
  box-shadow: 1px 1px 6px ${grey};
  /* min-height: 280px; */
  :hover img{
    transform: scale(1.15);
  }
`;

const WhiteBox = styled(Link)`
  /* background-color: ${white}; */
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 140px;
    transition: ease-in-out .3s;
  }

 
`;

const Title = styled(Link)`
  font-weight: bold;
  font-size: .9rem;
  text-decoration: none;
  color: ${black};
  margin: 5px;
`;

const ProductInfoBox = styled.div`
  margin: 5px 0;
  /* padding: 5px; */
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px 0;
  padding: 10px 0;
  border-top: 1px solid ${grey};
`;

const Price = styled.div`
  font-size: .8rem;
  font-weight: bold;
  margin: 5px;
  color: ${price};
  @media screen and (min-width: 768px) {
    font-size: 1rem;
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
            <Title href={url}>{title.slice(0, 20)}</Title>
          </div>
          <PriceBox>
            <Price>${price}</Price>
            
            <Button buy onClick={() => [addProduct(_id), msg()]} ><CartIcon /></Button>
          </PriceBox>
          
        </ProductInfoBox>
        
    </ProductWrapper>
    
  )
}

export default ProductBox