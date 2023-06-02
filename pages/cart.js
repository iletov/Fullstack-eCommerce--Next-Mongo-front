import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Header from '@/components/Header'
import Button from '@/components/StyledBtn';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Table from '@/components/Table';
import Input from '@/components/Input';
import Box from '@/components/Box';

const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1.2fr .8fr;
  }
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

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;


const CartPage = () => {
  const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

   useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts}).then(response => {
        setProducts(response.data);
      })
    } else {
      setProducts([])
    }
   }, [cartProducts]);

   useEffect(() => {
    if (typeof window === 'object' && window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
   },[])


   const plussProduct = (id) => {
    addProduct(id);
   };

   const minusProduct = (id) => {
    removeProduct(id);
   };

   const goToPayment = async () => {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country, cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
   };

   let totalAmount = 0;
   for (const productId of cartProducts) {
    const price = products.find((singleProduct) => singleProduct._id === productId)?.price || 0;
    totalAmount += price;
   };

   if (isSuccess) {
      return (
        <>
          <Header/>
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Thank You for your order!</h1>
                <p>We will email you when your order will be sent.</p>
              </Box>
            </ColumnsWrapper>
          </Center>
        </>  
      )   
   };

   
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
                          <img src={product?.images[0]} alt='...'/>
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
               
                  <Input 
                    type='text' 
                    placeholder='Name' 
                    value={name}
                    name='name' 
                    onChange={(e) => setName(e.target.value)} />
                  <Input 
                    type='text' 
                    placeholder='Email' 
                    value={email}
                    name='email' 
                    onChange={(e) => setEmail(e.target.value)} />
                  <CityHolder>
                    <Input 
                      type='text' 
                      placeholder='City' 
                      value={city}
                      name='city' 
                      onChange={(e) => setCity(e.target.value)} />
                    <Input 
                      type='text' 
                      placeholder='Postal Code' 
                      value={postalCode}
                      name='postalCode' 
                      onChange={(e) => setPostalCode(e.target.value)} />
                  </CityHolder>
                  <Input 
                    type='text' 
                    placeholder='Street Address' 
                    value={streetAddress}
                    name='streetAddress' 
                    onChange={(e) => setStreetAddress(e.target.value)} />
                  <Input 
                    type='text' 
                    placeholder='Country' 
                    value={country}
                    name='country' 
                    onChange={(e) => setCountry(e.target.value)} />
                  <Button block primary 
                    onClick={goToPayment}
                    >
                    Continue to Payment
                  </Button>
               
              </Box>
            )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}

export default CartPage