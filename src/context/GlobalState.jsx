import { createContext, useEffect, useState } from "react";

export const CardContext = createContext(null);

const GlobalState = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setloading] = useState(false);
  const [countryDetails, setcountryDetails] = useState([]);
  const [input, setinput] = useState("");
  const [country, setCountry] = useState(null);

  const fetchingapi = async () => {
    setloading(true);
    try {
      let url =
        input.trim() === ""
          ? "https://restcountries.com/v3.1/all?fields=name,flags,population,region"
          : `https://restcountries.com/v3.1/name/${input}?fields=name,flags,population,region`;

      const resp = await fetch(url);
      const data = await resp.json();

      if (Array.isArray(data)) {
        setcountryDetails(input ? data : data.slice(0, 10));
      } else {
        setcountryDetails([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchingapi();
  }, [input]);

  return (
    <CardContext.Provider
      value={[
        isDark, setIsDark,
        loading, setloading,
        countryDetails, setcountryDetails,
        input, setinput,
        country, setCountry
      ]}
    >
      {children}
    </CardContext.Provider>
  );
};

export default GlobalState;
