import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

import { IoLocationOutline } from "react-icons/io5";
import { RiUserVoiceLine, RiRobot3Line } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { LuBot } from "react-icons/lu";

import style from "./PageInitial.module.css";
import { NavLink } from "react-router-dom";

const PageInitial = () => {
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        {loadingPage && <LoadingPage />}

        {!loadingPage && (
          <div>

            <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
              Facilitando seu acesso aos serviços públicos de Caruaru, de forma
              rápida e sem burocracia.
            </h2>

            <div className={style.divsCards}>
              <NavLink to="/servicos">
                <div>
                  <FaNotesMedical />
                  <span>Serviços Populares</span>
                </div>
              </NavLink>

              <NavLink to="/chatbot">
                <div>
                  <LuBot/>
                  <span>Fale com a Gente (Chatbot)</span>
                </div>
              </NavLink>

              <NavLink to="/guiaVoz">
                <div>
                  <RiUserVoiceLine />
                  <span>Guia por Voz</span>
                </div>
              </NavLink>

              <NavLink to="/localizacao">
                <div>
                  <IoLocationOutline />
                  <span>Localize Atendimento</span>
                </div>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageInitial;
