import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductsGrid = ({products}) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products?.map((item) => (
            <ProductBox key={products._id} {...item}/>
          ))}
    </StyledProductsGrid>
  )
}

export default ProductsGrid