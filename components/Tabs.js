import styled from "styled-components"
import { dark, grey, primary } from "./Colors";

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
    color: ${primary};
    border-bottom: 3px solid ${primary}
  ` : `
    color: ${grey}
  `}
`;

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <StyledTabs>
      {tabs.map((tabName) => (
        <StyledSpan 
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