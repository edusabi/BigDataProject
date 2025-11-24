import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import PageInitial from "./Pages/PageInitial/PageInitial";
import ChatBot from "./Pages/ChatBot/ChatBot";
import Sobre from "./Pages/Sobre/Sobre";
import Contacts from "./Pages/Contacts/Contacts";
import Services from "./Pages/Services/Services";
import Localizacao from "./Pages/Localizacao/Localizacao";
import GuiaVoz from "./Pages/GuiaVoz/GuiaVoz";


//components
// import ConfigButton from "./Components/ConfigButton/ConfigButton";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [search, setSearch] = useState("");

  return (
      <div>

        <BrowserRouter>
        
          <Navbar onSearch={setSearch}/>
          
          <Routes>

            <Route path='/' element={<PageInitial/>}/>
            <Route path='/chatBot' element={<ChatBot/>}/>
            <Route path='/about' element={<Sobre/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
            <Route path='/servicos' element={<Services search={search}/>}/>
            <Route path='/localizacao' element={<Localizacao/>}/>
            <Route path='/guiaVoz' element={<GuiaVoz/>}/>

          </Routes>
          {/* <ConfigButton/> */}
        </BrowserRouter>

      </div>
  )
}

export default App
