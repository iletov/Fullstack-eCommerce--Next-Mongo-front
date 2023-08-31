import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";
import { HorizontalScroll } from "./HorizontalScroll";

const StyledProductsGrid = styled.div`
  margin-bottom: 100px;
  display: flex;
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
const ProductWrapp = styled.div`
  min-width: 200px;
  padding: 0 5px;
`;



const ProductsGrid = ({products, wishedProducts=[], carousel }) => {
  return (

    <>
    {carousel === false && (
      <StyledProductsGrid>
      {products?.length > 0 && products?.map((item, index) => (
          <RevealWrapper key={item._id} delay={index*100}>
            <ProductWrapp >
              <ProductBox {...item} wishedProp={wishedProducts.includes(item._id)} />
            </ProductWrapp>
          </RevealWrapper>
          ))}
      </StyledProductsGrid>
    )}

    {carousel === true && ( 
      
        <HorizontalScroll>
          {products?.length > 0 && products?.map((item, index) => (
            <RevealWrapper key={item._id} delay={index*100}>
              <ProductWrapp >
                <ProductBox {...item} wishedProp={wishedProducts.includes(item._id)} />
              </ProductWrapp>
            </RevealWrapper>
            ))}
        </HorizontalScroll>
        
    )}
      
    </>
  )
}

export default ProductsGrid