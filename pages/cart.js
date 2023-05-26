import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Header from '@/components/Header'
import Button from '@/components/StyledBtn';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Table from '@/components/Table';

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
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 5px;
`;

const CartPage = () => {
  const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
  const [products, setProducts] = useState([]);

   useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts}).then(response => {
        setProducts(response.data);
      })
    }
   }, [cartProducts]);


   const plussProduct = (id) => {
    addProduct(id);
   };

   const minusProduct = (id) => {
    removeProduct(id);
   }

   let totalAmount = 0;
   for (const productId of cartProducts) {
    const price = products.find((singleProduct) => singleProduct._id === productId)?.price || 0;
    totalAmount += price;
   }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h3>Cart</h3>
            {!products?.length ? (
              <h2>Your cart is empty</h2>
            ) : 
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead> 
                <tbody>
                   {products.map((product) => (
                    <tr> 
                      
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt='...'/>
                        </ProductImageBox>  
                        {product.title}
                      </ProductInfoCell>
                      
                      <td>
                        <Button onClick={() => minusProduct(product._id)} >-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length} {/* Quantity */}
                          </QuantityLabel>
                        <Button onClick={() => plussProduct(product._id)} >+</Button>
                      </td>
                      
                      <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>  {/* Quantity x Price */}             
                    
                    </tr>
                ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${totalAmount}</td>
                  </tr>
                </tbody>
              </Table>
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