import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
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