import React from 'react'
import styled, { css } from 'styled-components'

export const ButtonStyleCss = css`
  border: 0;
  padding: 10px 15px;
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  
  ${props => props.size  === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
  `}

  ${props => props.primary && css`
    background-color: var(--primary-color);
    color: var(--white-color);
    border: 1px solid var(--primary-color);
    
    svg {
      height: 16px;
    }
  `}

  ${props => props.white && css`
    background-color: var(--white-color);
    color: #000;
  `}

  ${props => props.outline && css`
    background-color: transparent;
    color: var(--white-color);
    border: 1px solid var(--white-color);
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