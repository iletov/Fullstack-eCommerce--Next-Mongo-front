import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '@/components/Input'
import axios from 'axios'
import ProductsGrid from '@/components/ProductsGrid'
import { debounce } from 'lodash'
import { Spinner } from '@/components/Spinner'
import { primary } from '@/components/Colors'
import { CartContext } from '@/components/CartContext'
import Footer from '@/components/Footer'

const SearchInput = styled(Input)`
  padding: 10px;
  border-radius: 5px;
  margin: 30px 0;
  transition: ease-in-out .25s;
  :focus {
    outline: none;
    border: 1px solid ${primary};
    padding: 15px;
    transition: ease-in-out .25s;
    }
`;

const SearchPage = () => {
  const { carousel, setCarousel } = useContext(CartContext);
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState('');
  const debouncedSearch = useCallback(debounce(phrase => searchProducts(phrase), 500),[]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      setCarousel(false);
      debouncedSearch(phrase);
    } else {
      setProducts('');
    }
  }, [phrase])

  const searchProducts = (phrase) => {
    axios.get('api/products?phrase=' + encodeURIComponent(phrase))
      .then(result => {
        setProducts(result.data);
        setIsLoading(false);
        // console.log(result.data);
    })
  };

  return (
    <>
      <Header/>
      <Center>
        <SearchInput 
          autoFocus 
          placeholder='Search' 
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          />
          {!isLoading && phrase !== '' && products.length === 0 && (
            <h2>No products match for &quot;{phrase}&quot;</h2>
          )}
          {isLoading && (
            <Spinner />
          )}
          {!isLoading && products.length > 0 && (
            <ProductsGrid products={products} carousel={carousel}></ProductsGrid>
          )}
          
      </Center>
      <Footer/>
    </>
  )
}

export default SearchPage