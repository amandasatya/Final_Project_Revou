import React, { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Component
      {...pageProps}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default MyApp;
