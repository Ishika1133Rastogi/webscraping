import React, { createContext, useState, useContext } from 'react';

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState('');

  return (
    <UrlContext.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useBaseUrl = () => useContext(UrlContext);
