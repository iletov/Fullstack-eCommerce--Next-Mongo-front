import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '@/components/Input'
import axios from 'axios'
import ProductsGrid from '@/components/ProductsGrid'
import { debounce } from 'lodash'
import { Spinner } from '@/components/Spinner'
import { dark, grey, primary } from './Colors'
import { darkgrey } from './Colors'
import { CartContext } from './CartContext'


const ImgWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;


const SearchInput = styled(Input)`
  padding: 15px;
  border-radius: 20px;
  transition: ease-in-out .25s;
  position: relative;
  width: 100%;
  border: 2px solid ${primary};
  font-weight: bold;
  :focus {
    outline: none;
    }
`;

const SearchedProductsWrap = styled.div`
  margin: 30px 0;
`;

const NoFound = styled.h3`
  margin: 10px 0 50px;
  font-weight: 400;
  color: ${darkgrey};
`;


const SearchHome = () => {
  const { carousel } = useContext(CartContext);
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(
    debounce(phrase => searchProducts(phrase), 500), []);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
      // searchProducts(phrase)
    } else {
      debouncedSearch()
      setProducts([]);
    }
  }, [phrase])

  const searchProducts = (phrase) => {
    axios.get('api/products?phrase=' + encodeURIComponent(phrase))
      .then(res => {
        setProducts(res.data);
        setIsLoading(false);
        // console.log(result.data);
      })
  };

  return (
    <Center>
            <ImgWrapper>
              <SearchInput 
              autoFocus 
              placeholder='Search' 
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              />
            </ImgWrapper>
          
            {!isLoading && phrase !== '' && products.length === 0 && (
              <NoFound>No products match for {phrase}</NoFound>
            )}
            {isLoading && (
              <Spinner />
            )}
            {!isLoading && products.length > 0 && (
              <SearchedProductsWrap>
                <ProductsGrid 
                products={products}
                carousel={carousel}
                ></ProductsGrid>
              </SearchedProductsWrap>
            )}
            
          
    </Center>
  )
}

export default SearchHome