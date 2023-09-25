import styled from "styled-components";

import Link from "next/link";
import { white } from "./Colors";
import Button from "./StyledBtn";
import Center from "./Center";

import { HorizontalScroll } from "./HorizontalScroll";

const CategoryWrapper = styled.div`
  margin: 40px 0;
`;

const WhiteBox = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: center;
  border-radius: 5%;
  margin: 0 25px;
  img {
    transition: ease-in-out 0.1s;
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
            
              <WhiteBox key={index}>
                <StyledLink href={"/category/" + singleCategory._id}>
                  <Button primaryOutline>{singleCategory.name}</Button>
                </StyledLink>

                {categoriesProducts[singleCategory._id].map((singleProduct) => (
                  <div key={singleProduct._id}>
                    <Link href={"/category/" + singleCategory._id}>
                      <img src={singleProduct.images[0]} alt="img" />
                    </Link>
                  </div>
                ))}
              </WhiteBox>
            
          ))}
        </HorizontalScroll>
      </CategoryWrapper>
    </Center>
  );
};
