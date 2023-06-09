import { CartContextProvider } from "@/components/CartContext";
import { Toaster } from "react-hot-toast";
import { createGlobalStyle } from "styled-components"
import { SessionProvider } from "next-auth/react"

const GlobalStyles = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: system-ui, 'Roboto', sans-serif;
    background-color: #eee;
  }

  hr{
    display: block;
    border:0;
    border-top:1px solid #ccc;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <GlobalStyles />
        <SessionProvider session={session}>
          <CartContextProvider>
            <Toaster />
            <Component {...pageProps} />
          </CartContextProvider>
        </SessionProvider>
        
        
    </>
      
  ) 
  
}
