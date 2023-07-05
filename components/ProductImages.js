import { useState } from "react";
import styled from "styled-components"
import { primary } from "./Colors";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 220px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  gap: 10px;
`;

const SmallImage = styled.div`
  margin-top: 10px;
  border: 2px solid #ccc;
  ${props => props.active ? `
    border-color: ${primary};
  ` : `
    border-color: transparent;
  `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 3px;
`;

const ProductImages = ({images}) => {
  const [activeImage, setActiveImage] = useState(images?.[0])

  return (
    <>  
      <BigImageWrapper>
        <BigImage src={activeImage}/>
      </BigImageWrapper>
     
      <ImageWrapper>
        {images.map((image, index) => (
          <SmallImage
            key={index} 
            onClick={() => setActiveImage(image)} 
            active={image === activeImage}
            >
            <Image src={image} alt="..."/>
          </SmallImage>
        ))}
      </ImageWrapper> 
    </>
  )
}

export default ProductImages