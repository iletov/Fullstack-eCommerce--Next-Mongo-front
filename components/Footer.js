import React from 'react'
import Center from './Center'
import styled from 'styled-components'
import { background, black, primary, white } from './Colors';
import Link from 'next/link';
import {MdFacebook} from 'react-icons/md'
import {BiLogoInstagramAlt} from 'react-icons/bi'
import {BsYoutube} from 'react-icons/bs'

const Wrapper = styled.div`
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${black};
  margin-top: 50px;

  @media screen and (min-width: 768px) {

  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: space-between;
  padding-top: 4rem;
  padding-bottom: 2rem;
  gap: 0.5rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;

  }
`;

const FooterList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (min-width: 640px) {
    width: 50%;
  }
  @media screen and (min-width: 768px) {
    width: 25%;
  }
  @media screen and (min-width: 1024px) {
    width: 16.66667%
}
`;

const FooterLink = styled(Link)`
  color:${white};
  min-width: 30px;
  text-decoration: none;
  font-weight: 300;
  transition: ease-in-out .1s;
  letter-spacing: 1px;
  :hover {
    color: ${primary};
  }
`;

const SingleText = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  @media screen and (min-width: 768px) {
    width: 33.33333%;
    margin-bottom: 0;
  }
`;

const HeaderMid = styled.h3`
  margin-bottom: .5rem;
  font-weight: bold;
  color: ${white};
`;

const Footer = () => {
  return (
    <>
      <Wrapper>
        <Center>
        <ListWrapper>
          <FooterList>
            <HeaderMid >Shop Categories</HeaderMid>
            <FooterLink href={'#'}>Home</FooterLink>
            <FooterLink href={'#'}>All Products</FooterLink>
            <FooterLink href={'#'}>Account</FooterLink>
          </FooterList>

          <FooterList>
            <HeaderMid >Customer Service</HeaderMid>
            <FooterLink href={'#'}>Contact Us</FooterLink>
            <FooterLink href={'#'}>Shipping Poicy</FooterLink>
            <FooterLink href={'#'}>Returns and Exchanges</FooterLink>
            <FooterLink href={'#'}>FAQs</FooterLink>
          </FooterList>

          <SingleText>
            <HeaderMid >Customer Service</HeaderMid>
            <p style={{
                marginBottom: '0.5rem', 
                color:`${white}`,
                fontWeight:'300'}}>
              Eiusmod laboris sint adipisicing culpa enim nisi aliqua id adipisicing. 
              Nostrud esse culpa labore ipsum ad sint sit. 
              Proident mollit eu quis eiusmod. 
              Proident mollit eu quis eiusmod. 
            </p>
          </SingleText>

          <FooterList>
            <HeaderMid>Follow Us</HeaderMid>
            <div style={{ display:'flex', gap: '0.5rem'}}>
              <FooterLink href={'#'}><MdFacebook size={24}/></FooterLink>
              <FooterLink href={'#'}><BiLogoInstagramAlt size={24}/></FooterLink>
              <FooterLink href={'#'}><BsYoutube size={24}/></FooterLink>
            </div>
          </FooterList>

        </ListWrapper>
        </Center>
      </Wrapper>
    </>
  )
}

export default Footer