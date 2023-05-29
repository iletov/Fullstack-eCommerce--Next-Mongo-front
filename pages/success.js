import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Header from '@/components/Header'
import { useContext, useEffect } from 'react';
import styled from 'styled-components';



export default function success() {
  const { setCartProducts ,clearCart } = useContext(CartContext);

  useEffect(() => {
    setCartProducts([]);
    // clearCart()
  },[])

  return (
    <>
        <Header>
         <Center>
            <h1>Thank You for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </Center>
       </Header>
    </>
  )
}
