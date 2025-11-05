import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./CountriesDetail.css";
import { CardContext } from "../context/GlobalState";

const CountriesDetail = () => {
  const navigate = useNavigate();
  const { countryName } = useParams(); // ✅ get the name from the URL

  // ✅ Correct destructuring — match the same order as in GlobalState
  const [
    isDark, setIsDark,
    loading, setloading,
    countryDetails, setcountryDetails,
    input, setinput,
    country, setCountry
  ] = useContext(CardContext);

  // ✅ Fetch single country details when component mounts or countryName changes
  useEffect(() => {
    const fetchCountry = async () => {
      setloading(true);
      try {
        const resp = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const data = await resp.json();

        if (Array.isArray(data) && data.length > 0) {
          setCountry(data[0]);
        } else {
          setCountry(null);
        }
      } catch (error) {
        console.log("Error fetching country:", error);
      } finally {
        setloading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  // ✅ Handle loading and missing data cases
  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!country) return <h2 className="no-details">No details found for {countryName}</h2>;

  return (
    <div className="country-detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        Back To Home
      </button>

      <div className="country-detail">
        <img
          src={country.flags?.svg}
          alt={country.name?.common}
          className="country-flag"
        />

        <div className="country-info">
          <h1 className="country-name">{country.name?.common}</h1>
          <p><b>Official Name:</b> {country.name?.official}</p>
          <p><b>Capital:</b> {country.capital?.[0] || "N/A"}</p>
          <p><b>Population:</b> {country.population?.toLocaleString()}</p>
          <p><b>Region:</b> {country.region}</p>
          <p><b>Subregion:</b> {country.subregion}</p>
          <p><b>Area:</b> {country.area} km²</p>
          <p><b>Timezones:</b> {country.timezones?.join(", ")}</p>
          <p>
            <b>Currencies:</b>{" "}
            {country.currencies
              ? Object.values(country.currencies).map(c => c.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <b>Languages:</b>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountriesDetail;
