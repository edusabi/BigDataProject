import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import Home from './Pages/Home/Home';
import LoginRegistro from "./Pages/LoginRegistro/LoginRegistro";

function App() {

  return (
      <div>

        <BrowserRouter>
        
          <Routes>

            <Route path='/' element={<Home/>}/>
            <Route path='/loginRegistro' element={<LoginRegistro/>}/>

          </Routes>
        
        </BrowserRouter>

      </div>
  )
}

export default App
