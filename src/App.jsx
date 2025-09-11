import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import Home from './Pages/Home/Home';
import LoginRegistro from "./Pages/LoginRegistro/LoginRegistro";
import PageInitial from "./Pages/PageInitial/PageInitial";

function App() {

  return (
      <div>

        <BrowserRouter>
        
          <Routes>

            <Route path='/home' element={<Home/>}/>
            <Route path='/loginRegistro' element={<LoginRegistro/>}/>
            <Route path="/" element={<PageInitial/>}/>

          </Routes>
        
        </BrowserRouter>

      </div>
  )
}

export default App
