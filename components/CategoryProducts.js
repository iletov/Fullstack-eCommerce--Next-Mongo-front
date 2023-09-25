import React from "react";
import Center from "./Center";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import { HorizontalScroll } from "./HorizontalScroll";

const ProductsWrapper = styled.div`
  margin: 40px 0;
`;

const CategoryWrapper = styled.div`
  margin: 0 5px;
`;

const Wrapp = styled.div`
  min-width: 200px;
`;

export const CategoryProducts = ({
  mainCategories,
  categoriesProducts,
  wishedProducts = [],
}) => {
  return (
    <>
      <Center>
        <ProductsWrapper>
          <h2>All Products</h2>

          <HorizontalScroll>
            {mainCategories?.map((singleCategory, index) => (
              <CategoryWrapper key={index}>
                {categoriesProducts[singleCategory._id].map((product) => (
                  <Wrapp key={product._id}>
                    <ProductBox
                      {...product}
                      wishedProp={wishedProducts.includes(product._id)}
                    />
                  </Wrapp>
                ))}
              </CategoryWrapper>
            ))}
          </HorizontalScroll>
        </ProductsWrapper>
      </Center>
    </>
  );
};
