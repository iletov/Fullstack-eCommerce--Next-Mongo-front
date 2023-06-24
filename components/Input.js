import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  :focus {
    outline: none;
  }
`

const Input = (props) => {
  return (
    <StyledInput {...props}/>
  )
}

export default Input