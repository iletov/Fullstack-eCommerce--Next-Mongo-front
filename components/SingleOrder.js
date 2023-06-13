import styled from "styled-components"
import { dark, darkgrey, grey } from "./Colors";

const StyledOrder = styled.div`
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid ${grey};
  display: flex;
  gap: 30px;
  align-items: center;
  time {
    color: ${darkgrey};
    font-weight: bold;
  }
`;

const StyledDetails = styled.div`
  span {
    color: ${darkgrey};
  }
`;

const Address = styled.div`
  color: ${darkgrey};
  margin-top: 10px;
  font-size: .8rem;
  line-height: 1.2rem;
`;

const SingleOrder = ({ line_items, createdAt, ...restProps }) => {
  return (
    <StyledOrder>
      
      <div>
        <time>{(new Date(createdAt)).toLocaleString()}</time>
        <Address>
          {restProps.name}<br/>
          {restProps.email}<br/>
          {restProps.streetAddress}<br/>
          {restProps.city}, {restProps.postalCode}, {restProps.country}

        </Address>
      </div>
      
      <div>
        {line_items.map((item) => (
          <StyledDetails>
            <span>{item.quantity} x </span> {item.price_data.product_data.name}
          </StyledDetails>
        ))}
        </div>

    </StyledOrder>
  )
}

export default SingleOrder