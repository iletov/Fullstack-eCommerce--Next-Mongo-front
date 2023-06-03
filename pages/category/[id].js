import Center from '@/components/Center'
import { dark, grey, lightGray } from '@/components/Colors'
import Header from '@/components/Header'
import ProductsGrid from '@/components/ProductsGrid'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import React from 'react'
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
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  color: ${lightGray};
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: ${lightGray};
  }
`;

const CategoryPage = ({ category, products:originalProducts }) => {
  const [products, setProducts] = useState(originalProducts)
  const [filtersValues, setFiltersValues] = useState(
    category.properties.map((prop) => ({name: prop.name, value: 'all'}))
  );

  const handlerFilterChange = (filterName, filterValue) => {
    setFiltersValues(prev => {
      return prev.amp((prop) => ({
        name: prop.name,
        value: prop.name === filterName ? filterValue : prop.value,
      }));
    })
  };

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
                  {prop.values.map((val) => (
                    <option key={value} value={val} >{val}</option>
                  ))}
                </select>
              </Filter>
            ))}
          </FiltersWrapper>

        </CategoryHeader>
        <ProductsGrid products={...products}></ProductsGrid>
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
    }
  };
}