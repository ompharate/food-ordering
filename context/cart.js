import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const setProduct = (product) => {
    setCart((prev) => {
      const existingProductIndex = prev.findIndex(
        (item) => item.FoodItemID === product.FoodItemID
      );

      if (existingProductIndex >= 0) {
      
        const updatedCart = [...prev];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
          
        return [...prev, { ...product, quantity: product.quantity }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeProduct = (productId) => {
    setCart((prev) => prev.filter((product) => product.FoodItemID !== productId));
  };

  const updateProductQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((product) =>
        product.FoodItemID === productId ? { ...product, quantity } : product
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ setProduct, clearCart, removeProduct, updateProductQuantity, cart }}
    >
      {children}
    </CartContext.Provider>
  );
}
