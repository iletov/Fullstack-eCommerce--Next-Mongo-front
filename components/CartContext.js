import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() =>{
    if (cartProducts?.length > 0) {
      storage?.setItem('cart', JSON.stringify(cartProducts));
    }
  },[cartProducts]); //when add item to cart, save it to local storage.

  useEffect(() => {
    if (storage && storage.getItem('cart')) {
      setCartProducts(JSON.parse(storage.getItem('cart')));
    }
  }, []);

  
  const addProduct = (productId) => {
    setCartProducts(prev => [...prev, productId])
  };


  const removeProduct = (productId) => {
    setCartProducts(prev => {
      const position = prev.indexOf(productId);
      
      if (position !== -1) {
        return prev.filter((value, index) => index !== position);
      }
      return prev;
    });
  }

  return (
    <CartContext.Provider
      value={{ 
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        }}
    >
      {children}
    </CartContext.Provider>
  )
}