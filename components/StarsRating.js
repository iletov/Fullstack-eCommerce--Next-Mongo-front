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
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border: 0;
  /* display: inline-block; */
  background-color: transparent;
  color: ${primary};
  cursor: pointer;
`;

export const StarsRating = ({ defaultHowMany=0, onChange=()=>{} }) => {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const fiveStars = [1,2,3,4,5];

  const handleStarsClick = (number) => {
    setHowMany(number);
    onChange(number);
  }
  return (
    <Stars>
      {fiveStars.map(number => (
        <>
          <StarWrapper onClick={() => handleStarsClick(number)}>
            {howMany >= number ? <StarSolid/> : <StarOutline/>}
          </StarWrapper>
        </>
      ))}
    </Stars>
  )
}
