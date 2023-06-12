import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductsGrid = ({products, wishedProducts=[]}) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products?.map((item, index) => (
          <RevealWrapper key={item._id} delay={index*50}>
            <ProductBox {...item} wishedProp={wishedProducts.includes(item._id)} />
          </RevealWrapper>
            
          ))}
    </StyledProductsGrid>
  )
}

export default ProductsGrid