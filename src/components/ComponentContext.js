// components/ComponentContext.js
import React, { createContext, useContext, useState } from "react";

const ComponentContext = createContext();

export const useComponentContext = () => {
  return useContext(ComponentContext);
};

export const ComponentProvider = ({ children }) => {
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);

  const toggleComponent1 = () => {
    setShowComponent1(!showComponent1);
    setShowComponent3(false);
  };

  const toggleComponent2 = () => {
    setShowComponent2(!showComponent2);
  };

  return (
    <ComponentContext.Provider
      value={{
        showComponent1,
        showComponent3,
        showComponent2,
        toggleComponent1,
        toggleComponent2,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};
