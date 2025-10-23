import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import PageInitial from "./Pages/PageInitial/PageInitial";
import ChatBot from "./Pages/ChatBot/ChatBot";
import Sobre from "./Pages/Sobre/Sobre";
import Contacts from "./Pages/Contacts/Contacts";


//components
import ConfigButton from "./Components/ConfigButton/ConfigButton";

function App() {

  return (
      <div>

        <BrowserRouter>
        
          <Routes>

            <Route path='/' element={<PageInitial/>}/>
            <Route path='/chatBot' element={<ChatBot/>}/>
            <Route path='/about' element={<Sobre/>}/>
            <Route path='/contacts' element={<Contacts/>}/>

          </Routes>
          <ConfigButton/>
        </BrowserRouter>

      </div>
  )
}

export default App
