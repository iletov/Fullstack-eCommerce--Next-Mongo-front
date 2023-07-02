import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '@/components/Input'
import axios from 'axios'
import ProductsGrid from '@/components/ProductsGrid'
import { debounce } from 'lodash'
import { Spinner } from '@/components/Spinner'
import { dark, grey, primary } from './Colors'
import { darkgrey } from './Colors'
import Image from 'next/image'
import bennman from '@/assets/Benman.jpg'

const ImgWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;


const SearchInput = styled(Input)`
  padding: 15px;
  border-radius: 20px;
  transition: ease-in-out .25s;
  position: relative;
  width: 100%;
  :focus {
    outline: none;
    /* width: 100%; */
    border: 1px solid ${primary};
    transition: ease-in-out .25s;
    }
`;

const SearchedProductsWrap = styled.div`
  margin: 40px 0 100px;
`;

const NoFound = styled.h3`
  margin: 10px 0 50px;
  font-weight: 400;
  color: ${darkgrey};
`;

// const Herro = styled.div`
//   width: 100%;
//   height: 35vh;
//   position: relative;
//   background-color: ${dark};
// 	background-size: cover;
// 	background-blend-mode: darken;
//   display: flex;
//   align-items: center;
//   margin-bottom: 40px;
// `;

const SearchHome = () => {
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
              <NoFound>No products match for "{phrase}"</NoFound>
            )}
            {isLoading && (
              <Spinner />
            )}
            {!isLoading && products.length > 0 && (
              <SearchedProductsWrap>
                <ProductsGrid products={products}></ProductsGrid>
              </SearchedProductsWrap>
            )}
            
          
    </Center>
  )
}

export default SearchHome