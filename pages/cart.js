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
import { RevealWrapper } from 'next-reveal';
import { Spinner } from '@/components/Spinner';
import { useSession } from 'next-auth/react';

const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 40px 20px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tbody tr.subtotal td {
    padding: 5px 0;
  }
  table tbody tr td:nth-child(2) {
    min-width: 90px;
    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      opacity: .8;
    }
  }
  table tbody tr.total td:nth-child(2) {
    padding: 10px 0;
    text-align: right;
    font-size: 1.3rem;
    font-weight: 500;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1.2fr .8fr;
  }
`;

const ProductInfoCell = styled.td`
  padding: 25px 0;
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
  const {data:session} = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  

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
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    })
    }, []);

    useEffect(() => {
      if (!session) {
        return;
      }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
    });
   },[session])

   const plussProduct = (id) => {
    addProduct(id);
   };

   const minusProduct = (id) => {
    removeProduct(id);
   };

   const goToPayment = async () => {
    setIsLoading(true)
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country, cartProducts,
    })
    if (response.data.url) {
      window.location = response.data.url;
      setIsLoading(false);
    }
   };

   let productsTotal = 0;
   for (const productId of cartProducts) {
    const price = products.find((singleProduct) => singleProduct._id === productId)?.price || 0;
    productsTotal += price;
   };

   let total = (productsTotal + parseInt(shippingFee)).toFixed(2); 

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
          <RevealWrapper delay={50}>
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
                    <tr key={product._id}> 
                      
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
                        <Button primary onClick={() => plussProduct(product._id)} >+</Button>
                      </td>
                      
                      <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>             
                    </tr>
                ))}
                  <tr className='subtotal'>
                    <td colSpan={2}>Products</td>
                    <td>${productsTotal.toFixed(2)}</td>
                  </tr>
                  <tr className='subtotal'>
                    <td colSpan={2}>Shipping</td>
                    <td>${shippingFee}</td>
                  </tr>
                  <tr className='total'>
                    <td colSpan={2}>Total</td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            }
          </Box>
          </RevealWrapper>
          
            {!!cartProducts?.length && (
              <RevealWrapper delay={150}>
              {isLoading ? 
              <Box>
                <Spinner />
              </Box> : 
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
              }
              </RevealWrapper>
            )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}

export default CartPage