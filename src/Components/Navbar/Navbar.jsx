import { NavLink } from "react-router-dom"
import style from "./Navbar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className={style.divHeader}>

      <div className={style.divImg}>
        <img src="imgCaruaru.png" width="200px"/>
        <FaMagnifyingGlass style={{color:"white", fontSize:"1.2rem"}}/>
      </div>
        
        <div className={style.divList}>
            <NavLink to="/">Início</NavLink>
            <NavLink to="/">Serviços</NavLink>
            <NavLink to="/chatbot">Chatbot</NavLink>
            <NavLink to="/about">Sobre</NavLink>
            <NavLink to="/contacts">Contato</NavLink>
        </div>

    </div>
  )
}

export default Navbar