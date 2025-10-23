import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const PageInitial = () => {
  
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoadingPage(false);
    },1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        {loadingPage && <LoadingPage />}

        {!loadingPage && (
          <div>
            <Navbar />
          
              <h2 style={{textAlign:"center"}}>
                Facilitando seu acesso aos serviços públicos de Caruaru,
                de forma rápida e sem burocracia.
              </h2>

              <div>
                <div>chatbot</div>
                <div>voice</div>
                <div>serviços</div>
                <div>localização</div>
              </div>
          
          </div>
        )}
      </div>

    </div>
  );
};

export default PageInitial;
