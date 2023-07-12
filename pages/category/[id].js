import { CartContext } from '@/components/CartContext'
import Center from '@/components/Center'
import { black, dark, grey, lightGray, primary, white } from '@/components/Colors'
import Header from '@/components/Header'
import ProductsGrid from '@/components/ProductsGrid'
import { Spinner } from '@/components/Spinner'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import axios from 'axios'
import { RevealWrapper } from 'next-reveal'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Filter = styled.div`
  background-color: transparent;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  color: ${black};

  select {
   background-color: transparent;
    border: 1;
    padding: 4px 6px;
    border-radius: 100px;
    font-size: inherit;
    color: ${black};

  }

  
`;

const CategoryPage = ({ category, subCategories, products:originalProducts }) => {
  const defaultFiltersValues = category.properties.map((prop) => ({name: prop.name, value: 'all'}));
  const defaultSorting = '_id-desc';
  
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFiltersValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  const { carousel, setCarousel } = useContext(CartContext);

  const handlerFilterChange = (filterName, filterValue) => {
    setFiltersValues(prev => {
      return prev.map((prop) => ({
        name: prop.name,
        value: prop.name === filterName ? filterValue : prop.value,
      }));
    })
  };

  useEffect(() => {
    setCarousel(false);
  },[])

  useEffect(() => {
    
    if (filtersValues !== defaultFiltersValues || sort !== defaultSorting) {
      setLoadingProducts(true);
      
    }

    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
   
    const params = new URLSearchParams;
    params.set('categories', catIds.join(','))
    params.set('sort', sort);

    filtersValues.forEach(f => {
      if (f.value !== 'all') {
        params.set(f.name, f.value)
      }
      });

    const url = `/api/products?` + params.toString();
    axios.get(url).then(result => {
      setProducts(result.data)})
      

      setTimeout(() => {
        setLoadingProducts(false);
      }, 400);

  }, [filtersValues, sort])

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <h2>{category.name}</h2>
          
          <FiltersWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select
                  onChange={(e) => handlerFilterChange(prop.name, e.target.value)}
                  value={filtersValues.find((filter) => filter.name === prop.name).value}
                >
                  <option value='all'>All</option>
                  {prop.values.map((val, index) => (
                    <option key={index} value={val} >{val}</option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value='price-asc'>price &darr; </option>
                <option value='price-desc'>price &uarr;</option>
                <option value='_id-asc'>newest &darr;</option>
                <option value='_id-desc'>newest &uarr;</option>
              </select>
            </Filter>
          </FiltersWrapper>

        </CategoryHeader>
        {loadingProducts && (
          <Spinner />
        )}
        {!loadingProducts && (
          <div>
            {products.length > 0 ? 
              <RevealWrapper delay={150}>
                <ProductsGrid 
                products={products}
                carousel={carousel}
                />
              </RevealWrapper>
              
            : 
            <div>Sorry, no products to display!</div>}
          </div>
           
        )}
      </Center>
    </>
  )
}

export default CategoryPage

export async function getServerSideProps(context) {
  const { id } = context.query;

  const category = await Category.findById(id);
  const subCategories = await Category.find({parent: category._id})
  const catIds = [category._id, ...subCategories.map((item) => item._id )]

  const products = await Product.find({category:catIds})

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    }
  };
}