import styled from "styled-components";
import ProductBox from "./ProductBox";
import { HorizontalScroll } from "./HorizontalScroll";

const StyledProductsGrid = styled.div`
  margin: 20px 0px;
  display: flex;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }

  @media screen and (min-width: 480px) {
    flex-wrap: wrap;
  }
`;
const ProductWrapp = styled.div`
  min-width: 200px;
  padding: 0 5px;
`;

const ProductsGrid = ({ products, wishedProducts = [], carousel }) => {
  return (
    <>
      {carousel === false && (
        <StyledProductsGrid>
          {products?.length > 0 &&
            products?.map((item, index) => (
              <ProductWrapp key={index}>
                <ProductBox
                  {...item}
                  wishedProp={wishedProducts.includes(item._id)}
                />
              </ProductWrapp>
            ))}
        </StyledProductsGrid>
      )}

      {carousel === true && (
        <HorizontalScroll>
          {products?.length > 0 &&
            products?.map((item, index) => (
              <ProductWrapp key={index}>
                <ProductBox
                  {...item}
                  wishedProp={wishedProducts.includes(item._id)}
                />
              </ProductWrapp>
            ))}
        </HorizontalScroll>
      )}
    </>
  );
};

export default ProductsGrid;
