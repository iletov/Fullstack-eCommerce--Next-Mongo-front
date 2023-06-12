import Link from 'next/link'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Center from './Center'
import { CartContext } from './CartContext'
import Bars from './Bars'
import { dark, white } from './Colors'
import { SearchIcon } from './SearchIcon'

const StyledHeader = styled.header`
  background-color: ${dark};
  ${props => props.mobileView && `
    position: fixed;
    width: 100%;
  `}
`;

const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileView ? `
  display: block;
  ` : `
  display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 50px 20px 20px;
  background-color: ${dark};
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  min-width: 30px;
  text-decoration: none;
  padding: 10px 0;
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  width: 40px;
  height: 40px;
  color: ${white};
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
`;

const Header = () => {
  const {cartProducts} = useContext(CartContext);
  const [mobileView, setMobileView] = useState(false);

  return (
    <StyledHeader mobileView={mobileView}>
      <Center>
        <Wrapper>
        <Logo href={'/'}>Ecommerce</Logo>

          <StyledNav mobileView={mobileView}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>

          <SideIcons>
            <NavLink href={'/search'}><SearchIcon /></NavLink>
            <NavButton onClick={() => setMobileView((prev) => !prev)}>
              <Bars />
            </NavButton>
          </SideIcons>
          
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}

export default Header