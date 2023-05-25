import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Header from '@/components/Header'
import Button from '@/components/StyledBtn';
import { useContext } from 'react';
import styled from 'styled-components'

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr .7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

const CartPage = () => {
  const {cartProducts} = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length ? (
              <h2>Your cart is empty</h2>
            ) : 
              <>
                Testing 
              </>
            }
          </Box>
          
            {!!cartProducts?.length && (
              <Box>
                <h3>Order Information</h3>
                <input type='text' placeholder='Address' />
                <input type='text' placeholder='Address 2' />
                <Button block primary >Continue to Payment</Button>
              </Box>
            )}
        </ColumnsWrapper>
      </Center>

    </>
  )
}

export default CartPage