import { useEffect, useState } from "react";
import servicesData from "../../services.json";
import styles from "./Services.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Services = ({ search }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(servicesData);
  }, []);

  const filtered = services.filter((srv) =>
    srv.name.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <NavLink to="/"><FaArrowLeftLong style={{fontSize:"1.5rem", color:"black"}}/></NavLink>
      <h1 className={styles.title}>Serviços Disponíveis</h1>

      {Object.keys(grouped).map((cat) => (
        <div key={cat} className={styles.categoryBox}>
          <h2 className={styles.category}>{cat}</h2>
          <ul className={styles.list}>
            {grouped[cat].map((srv) => (
              <li key={srv.id}>
                <strong>{srv.name}</strong>
                {srv.requiredDocuments?.length > 0 && (
                  <ul className={styles.docList}>
                    {srv.requiredDocuments.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Services;
