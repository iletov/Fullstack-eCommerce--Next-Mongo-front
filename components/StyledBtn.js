import React from 'react'
import styled, { css } from 'styled-components'
import { black, buyIcon, dark, grey, primary, secondary, white } from './Colors';

export const ButtonStyleCss = css`
  border: 0;
  padding: 10px 15px;
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  background-color: ${grey};
  svg {
    height: 16px;
  }

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  
  ${props => props.size  === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
  `}

  ${props => props.primary && css`
    background-color: ${black};
    color: ${primary};
    border: 1px solid ${black};
    svg {
      height: 16px;
      padding-bottom: 2px;
      margin: 0 3px;
    }
  `}

  ${props => props.primaryOutlineOne && css`
    background-color: transparent;
    color: ${primary};
    /* padding: 0; */
    border: 1px solid ${primary};
    svg {
      height: 24px;
    }
  `}

${props => props.primaryOutline && css`
    background-color: transparent;
    /* color: ${primary}; */
    padding: 0;
    border: 1px solid transparent;
    svg {
      height: 24px;
    }
  `}

${props => props.buy && css`
    background-color: transparent;
    color: ${buyIcon};
    padding: 0;
    border: 1px solid transparent;
    svg {
      height: 24px;
    }
  `}

  ${props => props.white && css`
    background-color: ${white};
    color: #000;
  `}

  ${props => props.outline && css`
    background-color: transparent;
    color: ${white};
    border: 1px solid ${white};
  `}

${props => props.outlinedark && css`
    background-color: transparent;
    color: ${black};
    border: 1px solid ${black};
  `}

`;


const StyledButton = styled.button`
  ${ButtonStyleCss}    
`;

const Button = ({children, ...allProps}) => {
  return (
    <>
      <StyledButton {...allProps} >{children}</StyledButton>
    </>
  )
}

export default Button