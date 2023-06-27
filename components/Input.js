import styled from 'styled-components'
import { primary } from './Colors'

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 7px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  :focus {
    outline: 1px solid ${primary};
  }
`

const Input = (props) => {
  return (
    <StyledInput {...props}/>
  )
}

export default Input