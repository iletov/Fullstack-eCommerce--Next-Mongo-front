import styled from 'styled-components';

import Link from 'next/link';
import { grey, leftArrow, rightArrow, white } from './Colors';
import Button from './StyledBtn';
import Center from './Center';
import { RevealWrapper } from 'next-reveal';
import { HorizontalScroll } from './HorizontalScroll';

const Wrapper = styled.div`
margin: 50px 0;
`;

const CategoryWrapper = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 466px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WhiteBox = styled.div`
  background-color: ${white};
  padding: 0px;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: center;
  /* border-radius: 5px; */
  position: relative;
  box-shadow: 1px 1px 6px ${grey};
  img {
    transition: ease-in-out .1s;
    max-width: 100%;
    max-height: 100px;
    margin-bottom: 15px;
    transition: ease-in-out .3s;
  }

  :hover img {
    transform: scale(1.15);
  }

`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${white};
  button {
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 1px;
  }
`;

export const AllCategories = ({ mainCategories, categoriesProducts }) => {
  return (
    <Center>
    <Wrapper>
    <h2>All Categories</h2>
    <CategoryWrapper>

      {mainCategories?.map((singleCategory, index) => (
          <RevealWrapper delay={index*100} duration={1200} >
            <WhiteBox 
              key={index} 
              
              >
              <StyledLink href={'/category/' + singleCategory._id}>
                <Button primaryOutline >{singleCategory.name}</Button>
              </StyledLink>
              
              {categoriesProducts[singleCategory._id].map((singleProduct) => (
                  <div>
                    {/* <BoxTitle>{singleCategory.name}</BoxTitle> */}
                    <Link href={'/category/' + singleCategory._id}><img src={...singleProduct.images[0]} /></Link>
                  </div>
              ))}
            </WhiteBox>
            </RevealWrapper>
          ))}

    </CategoryWrapper>
    </Wrapper>
    </Center>
  )
}