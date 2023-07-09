"use client";
import { createContext, useState } from "react";
export const TokenContext = createContext(null);
export default function Context({ children }) {
    const [token, setToken] = useState();
  
    return (
      <TokenContext.Provider value={{ token, setToken }}>
        {children}
      </TokenContext.Provider>
    );
  }