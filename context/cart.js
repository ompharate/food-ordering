import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const setProduct = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const clearCart = () => {
    setCart(null);
  };

  const removeProduct = (productId) => {
    setCart((prev) => prev.filter((product) => product.FoodItemID !== productId));
  };
  
  return (
    <CartContext.Provider value={{ setProduct,clearCart,removeProduct,cart }}>
      {children}
    </CartContext.Provider>
  );
}
