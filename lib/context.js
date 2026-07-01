import { useState, useEffect, createContext, useContext } from "react";
const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [firstVisit, setFirstVisit] = useState(true);
  const [filterBarAnimated, setFilterBarAnimated] = useState(false);
  const [headerName, setHeaderName] = useState("Landan Earley");
  const [activeModal, setActiveModal] = useState(false);
  useEffect(() => {
    themeCheck();
  }, []);

  const themeCheck = () => {
    const darkModeLocal = JSON.parse(localStorage.getItem("darkMode"));
    if (darkModeLocal) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const onAdd = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      setCartItems(
        cartItems.map((currentItem) =>
          currentItem.id === product.id
            ? { ...exists, quantity: exists.quantity + 1 }
            : currentItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const onRemove = (product) => {
    const productToTarget = cartItems.find((item) => item.id === product.id);
    if (productToTarget.quantity === 1) {
      const removedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems([...removedCart]);
    } else {
      setCartItems(
        cartItems.map((currentItem) =>
          currentItem.id === product.id
            ? { ...productToTarget, quantity: productToTarget.quantity - 1 }
            : currentItem
        )
      );
    }
  };
  return (
    <ShopContext.Provider
      value={{
        darkMode,
        setDarkMode,
        onAdd,
        onRemove,
        cartItems,
        firstVisit,
        setFirstVisit,
        filterBarAnimated,
        setFilterBarAnimated,
        headerName,
        setHeaderName,
        activeModal,
        setActiveModal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
