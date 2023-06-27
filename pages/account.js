import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import Button from '@/components/StyledBtn';
import styled from 'styled-components';
import Box from '@/components/Box';
import { RevealWrapper } from 'next-reveal';
import Input from '@/components/Input';
import axios from 'axios';
import { Spinner } from '@/components/Spinner';
import ProductBox from '@/components/ProductBox';
import Tabs from '@/components/Tabs';
import SingleOrder from '@/components/SingleOrder';

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 30px;
  margin: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const AccountPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishListLoaded, setWishListLoaded] = useState(true);
  const [ordersLoaded, setOrdersLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);

  const {data: session} = useSession();
  // console.log(session)

  const logout = async () => {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  };

  const login = async () => {
    await signIn('google');
  };

  const saveAddress = () => {
    const data = {name, email, city, postalCode, streetAddress, country}
    axios.put('/api/address', data)
  };

  useEffect(() => {
    if (!session) {
      return
    }
    setAddressLoaded(false);
    setWishListLoaded(false);
    setOrdersLoaded(false);

    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });
    
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map((item) => item.product));
      setWishListLoaded(true);
    });

    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrdersLoaded(true);
    })
  }, [session])

  const productRemovedFromWishlist = (idToRemove) => {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)]
    })
  };

  return (
    <>
      <Header/>
      <Center>
      {!session && (
        <h3>You need to login to view content</h3>
      )}
      {session && (

        <ColumnWrapper>
            <div>
            <RevealWrapper delay={0}>
              <Box>
                <Tabs 
                  tabs={['Orders', 'Wishlist']} 
                  active={activeTab} 
                  onChange={setActiveTab} />
                    {activeTab === 'Orders' && (
                      <>
                        {!ordersLoaded && (
                          <Spinner />
                        )}
                        {ordersLoaded && (
                          <div>
                          {orders.length > 0 && orders.map((order, index) => (
                            <SingleOrder {...order} key={index}/>
                          ))}
                          </div>
                        )}
                      </>
                    )}
                    {activeTab === 'Wishlist' && (
                      <>
                      {!wishListLoaded && (
                        <Spinner />
                      )}
                        {wishListLoaded && (
                          <WishedProductsGrid>
                            {wishedProducts.length > 0 && wishedProducts.map((wishedItem, index) => (
                               <ProductBox key={wishedItem._id} {...wishedItem} wishedProp={true} onRemoveFromWishlisht={productRemovedFromWishlist} />
                            ))}
                          </WishedProductsGrid>
                        )}
                        {wishedProducts.length === 0 && (
                          <p>Your list is empty</p>
                        )}
                      </>
                    )}
              </Box>
            </RevealWrapper>
            </div>
            <div>
            <RevealWrapper delay={50}>
               <Box>
                <h3>Account Details</h3>
                {!addressLoaded && (
                  <Spinner/>
                )}
                {addressLoaded && (
                  <>
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
                      onClick={saveAddress}
                      >
                      Save
                    </Button>
                    <hr/>
                  </>
                )}
                
                  {session && (
                    <Button onClick={logout}>Logout</Button>
                  )}
                  {!session && (
                    <Button primary onClick={login}>Login</Button>
                  )}
              </Box>
            </RevealWrapper>
            </div>
        </ColumnWrapper>
        )}

        {!session && (
          <Button primary onClick={login}>Login</Button>
        )}
        
      </Center>
    </>
  )
}

export default AccountPage