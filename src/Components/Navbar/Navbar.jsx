import { NavLink, useLocation } from "react-router-dom";
import style from "./Navbar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const showSearch = location.pathname === "/servicos"; 

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={style.divHeader}>

      <div className={style.divImg}>
        <img src="imgCaruaru.png" width="200px" />

        {showSearch && (
          <div className={style.searchBox}>
            <FaMagnifyingGlass style={{ color: "white", fontSize: "1.2rem" }} />
            <input
              type="text"
              placeholder="Pesquisar serviços..."
              value={query}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
