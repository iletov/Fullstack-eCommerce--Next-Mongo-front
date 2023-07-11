import styled from "styled-components"
import { black, dark, grey, primary } from "./Colors";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;

`;

const StyledSpan = styled.span`
  font-size: 1.5rem;
  padding-bottom: 10px;
  cursor: pointer;
  ${props => props.active ? `
    color: ${black};
    border-bottom: 3px solid ${primary}
  ` : `
    color: ${grey}
  `}
`;

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <StyledTabs>
      {tabs.map((tabName, index) => (
        <StyledSpan
          key={index} 
          active={tabName === active} 
          onClick={() => { onChange(tabName)}}
          >
            {tabName}
          </StyledSpan>
      ))}
    </StyledTabs>
  )
}

export default Tabs