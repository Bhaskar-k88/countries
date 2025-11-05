import { useEffect , useContext } from "react";
import "../App.css";
import { CardContext } from "../context/GlobalState";

const Header = () => {

  const [isDark , setIsDark] = useContext(CardContext)

  const handleClick = () => {
    setIsDark(!isDark);
  };

  // 🧠 Apply theme class to the <body> directly
  useEffect(() => {
    document.body.className = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <h1>Where in the world</h1>
      <button
        style={{ width: "100px", height: "40px" }}
        onClick={handleClick}
      >
        {isDark ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Header;
