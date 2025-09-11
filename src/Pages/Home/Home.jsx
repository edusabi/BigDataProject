import { NavLink } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <h1>Home</h1>
        <div>
          <button><NavLink to="/loginRegistro">Login</NavLink></button>
          <button><NavLink to="/loginRegistro">Registro</NavLink></button>
        </div>
    </div>
  )
}

export default Home