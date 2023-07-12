import styled from 'styled-components';

import Link from 'next/link';
import { leftArrow, rightArrow, white } from './Colors';
import Button from './StyledBtn';
import Center from './Center';
import { RevealWrapper } from 'next-reveal';
import { HorizontalScroll } from './HorizontalScroll';

const CategoryWrapper = styled.div`
  margin: 40px 0;
  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
  /* gap: 30px; */

  /* @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  } */
`;

const WhiteBox = styled.div`
  /* background-color: ${white}; */
  /* padding: 20px; */
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: center;
  border-radius: 5%;
  /* position: relative; */
  margin: 0 25px;
  img {
    /* filter: grayscale(100%); */
    transition: ease-in-out .1s;
    max-width: 100%;
    max-height: 90px;
    margin-bottom: 5px;
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

export const CategoryBox = ({ mainCategories, categoriesProducts }) => {
  return (
    <Center>
    <CategoryWrapper>
      <h2>All Categories</h2>
        <HorizontalScroll>
   
      {mainCategories?.map((singleCategory, index) => (
          <RevealWrapper delay={index*100} duration={1200} key={index} >
            <WhiteBox >
              <StyledLink href={'/category/' + singleCategory._id}>
                <Button primaryOutline >{singleCategory.name}</Button>
              </StyledLink>
              
              {categoriesProducts[singleCategory._id].map((singleProduct) => (
                  <div key={singleProduct._id} >
                    {/* <BoxTitle>{singleCategory.name}</BoxTitle> */}
                    <Link  href={'/category/' + singleCategory._id}><img src={singleProduct.images[0]} /></Link>
                  </div>
              ))}
            </WhiteBox>
            </RevealWrapper>
          ))}
          </HorizontalScroll>

    </CategoryWrapper>

    </Center>
  )
}