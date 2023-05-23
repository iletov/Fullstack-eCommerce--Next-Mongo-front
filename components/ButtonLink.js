import React from 'react'
import styled from 'styled-components'
import { ButtonStyleCss } from './StyledBtn'
import Link from 'next/link';

const StyledLink = styled(Link)`
  ${ButtonStyleCss}
`;

const ButtonLink = (props) => {
  return (
    <>
      <StyledLink {...props} />
    </>
  )
}

export default ButtonLink