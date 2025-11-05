import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./CountriesCard.css";
import { CardContext } from "../context/GlobalState";

const CountriesCard = () => {
  const [
    isDark,
    setIsDark,
    loading,
    setloading,
    countryDetails,
    setcountryDetails,
    input,
    setinput,
  ] = useContext(CardContext);

  const [region, setRegion] = useState(""); // 🆕 for region filter

  // 🧠 Filter countries by name and region
  const filteredCountries = countryDetails.filter((country) => {
    const matchName = country.name?.common
      .toLowerCase()
      .includes(input.toLowerCase());
    const matchRegion = region ? country.region === region : true;
    return matchName && matchRegion;
  });

  return (
    <div className="countries-container">
      <div className="search-filter-container">
        <div>
          <input
            className="country-input"
            type="text"
            placeholder="Enter the Country name..."
            onChange={(e) => setinput(e.target.value.toLowerCase())}
          />
        </div>

        <div>
          <select
            className="region-select"
            onChange={(e) => setRegion(e.target.value)} // 🆕 handle region change
          >
            <option hidden>Filter by region</option>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <div className="countries-grid">
        {loading ? (
          <h2>Loading...</h2>
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((curval) => (
            <Link
              key={curval.name?.common}
              to={`/country/${curval.name.common}`}
              className="country-link"
            >
              <div className="country-card">
                <img
                  className="country-flag"
                  src={curval.flags?.svg}
                  alt={curval.name.common}
                />
                <h3>{curval.name?.common}</h3>
                <p>Population: {curval.population}</p>
                <p>Region: {curval.region}</p>
              </div>
            </Link>
          ))
        ) : (
          <h3>No countries found</h3>
        )}
      </div>
    </div>
  );
};

export default CountriesCard;
