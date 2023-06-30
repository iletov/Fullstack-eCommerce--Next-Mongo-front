import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '@/components/Input'
import axios from 'axios'
import ProductsGrid from '@/components/ProductsGrid'
import { debounce } from 'lodash'
import { Spinner } from '@/components/Spinner'
import { grey, primary } from './Colors'
import { darkgrey } from './Colors'

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

const SearchedProductsWrap = styled.div`
  margin-bottom: 100px;
`;

const NoFound = styled.h3`
  margin: 10px 0 50px;
  font-weight: 400;
  color: ${darkgrey};
`;

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
    <>
      <Center>
        <SearchInput 
          autoFocus 
          placeholder='Search' 
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          />
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
    </>
  )
}

export default SearchHome