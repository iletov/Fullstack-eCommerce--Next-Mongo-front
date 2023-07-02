import styled from 'styled-components';

import Link from 'next/link';
import { background, boxGrey, dark, grey, primary, white } from './Colors';
import Button from './StyledBtn';
import Center from './Center';
import { RevealWrapper } from 'next-reveal';

const CategoryWrapper = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;


const WhiteBox = styled.div`
  background-color: ${white};
  padding: 20px;
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: center;
  border-radius: 50%;
  position: relative;

  img {
    filter: grayscale(100%);
    transition: ease-in-out .1s;
    max-width: 100%;
    max-height: 100px;
    margin-bottom: 5px;
  }

  img:hover {
    filter: none;
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
      {mainCategories?.map((singleCategory, index) => (
          <RevealWrapper delay={index*100} duration={1200}>
            <WhiteBox key={index} >
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
    </Center>
  )
}