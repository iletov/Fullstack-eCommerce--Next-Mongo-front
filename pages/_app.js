import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`


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
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
        
    </>
      
  ) 
  
}
