import styled from 'styled-components'
import { StarOutline } from './StarOutline'
import { StarSolid } from './StarSolid';
import { useState } from 'react';
import { primary } from './Colors';

const Stars = styled.div`
  display: inline-flex;
  gap: 2px;
  margin-bottom: 1rem;
`;

const StarWrapper = styled.button`
  ${props => props.size === 'md' && `
    width: 1.4rem;
    height: 1.4rem;
  `}
  ${props => props.size === 'sm' && `
    width: .8rem;
    height: .8rem;
  `}
  ${props => !props.disabled && `
    cursor: pointer;
  `}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;

export const StarsRating = ({ 
                              defaultHowMany=0, 
                              disabled, 
                              onChange=()=>{},
                              size='md'}) => {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const fiveStars = [1,2,3,4,5];

  const handleStarsClick = (number) => {
    if (disabled) {
      return
    }
      setHowMany(number);
      onChange(number);
  }
  return (
    <Stars>
      {fiveStars.map(number => (
        <>
          <StarWrapper 
            disabled={disabled} 
            size={size} 
            onClick={() => handleStarsClick(number)}
            >
            {howMany >= number ? <StarSolid/> : <StarOutline/>}
          </StarWrapper>
        </>
      ))}
    </Stars>
  )
}
