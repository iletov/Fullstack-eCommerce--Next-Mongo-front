import React from 'react'
import { FadeLoader } from 'react-spinners'
import { primary } from './Colors'
import styled from 'styled-components'

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;

export const Spinner = () => {
  return (
    <StyledSpinner>
      <FadeLoader 
        speedMultiplier={1} 
        color={primary}
        height={9}
        width={3}>

      </FadeLoader>
    </StyledSpinner>
    
  )
}
