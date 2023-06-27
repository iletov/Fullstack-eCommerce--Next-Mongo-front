import Link from 'next/link'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Center from './Center'
import { CartContext } from './CartContext'
import Bars from './Bars'
import { background, dark, darkgrey, lightGray, navLinks, primary, white } from './Colors'
import { SearchIcon } from './SearchIcon'

const StyledHeader = styled.header`
  background-color: ${white};
  ${props => props.mobileView && `
    position: fixed;
    width: 100%;
    background-color: ${background};
  `}
  top: 0;
  z-index: 10;
  border-top: 3px solid ${primary};
`;

const Logo = styled(Link)`
  color:${dark};
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
  background-color: ${background};
  ` : `
  display: none;

  `}
  gap: 25px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 50px 20px 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color:${dark};
  min-width: 30px;
  text-decoration: none;
  padding: 10px 0;
  font-weight: 500;
  transition: ease-in-out .1s;
  letter-spacing: 1px;
  :hover {
    color: ${primary};
  }

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