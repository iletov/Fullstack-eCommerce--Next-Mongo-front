import styled from 'styled-components';

import Link from 'next/link';
import { background, boxGrey, dark, grey, primary, white } from './Colors';
import Button from './StyledBtn';
import Center from './Center';


const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryWrapper = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${white};
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
  }

  img:hover {
    filter: none;
  }

`;

export const CategoryBox = ({ mainCategories, singleCategoryProduct }) => {
  return (
    <Center>
    <CategoryWrapper>
      {mainCategories?.map((singleCategory, index) => (
            <WhiteBox key={index} >
              <StyledLink href={'/category/' + singleCategory._id}>
                <Button primaryOutline >{singleCategory.name}</Button>
              </StyledLink>
              
              {singleCategoryProduct[singleCategory._id].map((singleProduct) => (
                  <div>
                    {/* <BoxTitle>{singleCategory.name}</BoxTitle> */}
                    <Link href={'/category/' + singleCategory._id}><img src={...singleProduct.images[0]} /></Link>
                  </div>
              ))}
            </WhiteBox>
          ))}
    </CategoryWrapper>
    </Center>
  )
}