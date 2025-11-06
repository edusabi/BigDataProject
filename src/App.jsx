import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import PageInitial from "./Pages/PageInitial/PageInitial";
import ChatBot from "./Pages/ChatBot/ChatBot";
import Sobre from "./Pages/Sobre/Sobre";
import Contacts from "./Pages/Contacts/Contacts";
import Services from "./Pages/Services/Services";
import Localizacao from "./Pages/Localizacao/Localizacao";


//components
import ConfigButton from "./Components/ConfigButton/ConfigButton";
import Documentos from "./Pages/Documentos/Documentos";

function App() {

  return (
      <div>

        <BrowserRouter>
        
          <Routes>

            <Route path='/' element={<PageInitial/>}/>
            <Route path='/chatBot' element={<ChatBot/>}/>
            <Route path='/about' element={<Sobre/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
            <Route path='/servicos' element={<Services/>}/>
            <Route path='/localizacao' element={<Localizacao/>}/>
            <Route path='/documentos' element={<Documentos/>}/>

          </Routes>
          <ConfigButton/>
        </BrowserRouter>

      </div>
  )
}

export default App
