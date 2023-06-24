import styled from "styled-components"
import Input from "./Input";
import Box from "./Box";
import { StarsRating } from "./StarsRating";
import { Textarea } from "./Textarea";
import Button from "./StyledBtn";
import { useState } from "react";
import axios from "axios";
import { Spinner } from "./Spinner";

const SubTitle = styled.h3`
  font-size: 1rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 0px;
`;

export const Reviews = ({ details }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitReview = () => {
    const data = {title, description, stars, product:details._id};
    axios.post('/api/reviews', {data}).then(res => {
      alert('ok');
      setTitle('');
      setDescription('');
      setStars(0);
    })
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/reviews?product='+ details._id).then(res => {
      setReview(res.data);
      setIsLoading(false);
    });
  }, [])
  

  return (
    <div>
      <h2>Reviews</h2>
      <ColumnsWrapper>
        <Box>
          <SubTitle>Add Review</SubTitle>
          <div>
            <StarsRating onChange={ setStars } />
          </div>
          <Input value={title} onChange={ e => setTitle(e.target.value)} placeholder='Title' />
          <Textarea value={description} onChange={ e => setDescription(e.target.value)} placeholder='Give us a review...' />
          <div>
            <Button primaryOutline onClick={submitReview} >Send</Button>
          </div>
        </Box>
        <Box>
          <SubTitle>All Reviews</SubTitle>
          {isLoading && ( <Spinner/> )}
          {Reviews.length === 0 && ( <p>No Reviews</p> )}
        </Box>
      </ColumnsWrapper>
    </div>
  )
}
