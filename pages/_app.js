import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  :root {
    --primary-color: #5542f6;
    --white-color: #fff;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
        <Component {...pageProps} />
    </>
      
  ) 
  
}
