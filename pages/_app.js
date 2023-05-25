import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: system-ui, 'Roboto', sans-serif;
    background-color: #eee;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
        <Component {...pageProps} />
    </>
      
  ) 
  
}
