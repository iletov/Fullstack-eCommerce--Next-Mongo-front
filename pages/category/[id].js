import Center from '@/components/Center'
import Header from '@/components/Header'
import ProductsGrid from '@/components/ProductsGrid'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import React from 'react'

const CategoryPage = ({ category, products }) => {
  return (
    <>
      <Header />
      <Center>
        <h2>{category.name}</h2>
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