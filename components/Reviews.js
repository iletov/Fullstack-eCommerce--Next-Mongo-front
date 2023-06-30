import styled from "styled-components"
import Input from "./Input";
import Box from "./Box";
import { StarsRating } from "./StarsRating";
import { Textarea } from "./Textarea";
import Button from "./StyledBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "./Spinner";
import { darkgrey, lightGray, lines } from "./Colors";
import moment from "moment/moment";

const SubTitle = styled.h3`
  font-size: 1rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 15px;
  padding: 15px 0;
  h5, p {
    margin: 0px;
    padding: 2px;
    color: ${darkgrey}
  }

  border-top: 1px solid ${lines};
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  time {
    font-size: 12px;
    color: ${lightGray};
  }
`;

export const Reviews = ({ product }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitReview = () => {
    const data = {title, description, stars, product:product._id};
    axios.post('/api/reviews', data).then(res => {
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    })
  };

  const loadReviews = () => {
    setIsLoading(true);
    axios.get('/api/reviews?product='+ product._id).then(res => {
      setReviews(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadReviews();
  }, [])
  

  return (
    <div>
      <h2>Reviews</h2>
      <ColumnsWrapper>
        <div>
          <Box>
            <SubTitle>Add Review</SubTitle>
            <div>
              <StarsRating onChange={ setStars } />
            </div>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Give us a review...' />
            <div>
              <Button primaryOutlineOne onClick={submitReview}>Send</Button>
            </div>
          </Box>
        </div>

        <div>
          <Box>
            <SubTitle>All Reviews</SubTitle>
            {isLoading && ( <Spinner/> )}
            {reviews.length === 0 && ( <p>No Reviews</p> )}
            {reviews.length > 0 && reviews.map(review => (
              <ReviewWrapper>
                <ReviewHeader>
                  <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} />
                  {/* <time>{(new Date(review.createdAt)).toLocaleString('bg-BG')}</time> */}
                  <time>{moment(review.createdAt).startOf('ss').fromNow()}</time>
                </ReviewHeader>
                <h5>{review.title}</h5>
                <p>{review.description}</p>
              </ReviewWrapper>
            ))}
          </Box>
        </div>
      </ColumnsWrapper>
    </div>
  )
}
