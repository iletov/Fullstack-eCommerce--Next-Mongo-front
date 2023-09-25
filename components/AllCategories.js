import styled from 'styled-components';

import Link from 'next/link';
import { grey, leftArrow, rightArrow, white } from './Colors';
import Button from './StyledBtn';
import Center from './Center';
import { RevealWrapper } from 'next-reveal';

const Wrapper = styled.div`
margin: 50px 0;

@media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

`;

const CategoryWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

`;

const WhiteBox = styled.div`
  background-color: ${white};
  padding: 0px;
  height: 180px;
  min-width: 200px;
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
          <RevealWrapper delay={index*100} duration={1200} key={index}>
            <WhiteBox >
              <StyledLink href={'/category/' + singleCategory._id}>
                <Button primaryOutline >{singleCategory.name}</Button>
              </StyledLink>
              
              {categoriesProducts[singleCategory._id].map((singleProduct) => (
                  <div key={singleProduct._id}>
                    {/* <BoxTitle>{singleCategory.name}</BoxTitle> */}
                    <Link href={'/category/' + singleCategory._id}><img src={singleProduct.images[0]} alt='img'/></Link>
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