import { devsInfo } from "@pages/page-about/constant";
import { useEffect, useState } from "react";
import styles from "../../page-about.module.scss";

export function DevsTab() {
  const [person, setPerson] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerson((prev) => {
        if (prev + 1 === devsInfo.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={styles.devs}>
        {devsInfo.map((dev, index) => (
          <div key={index} className="text-center">
            <img
              src={dev.img}
              alt={dev.name}
              className={`${person !== index ? styles.gray : ""}`}
            />
            <span className={`${person === index ? styles.active : ""}`}>
              <h4>{dev.name}</h4>
              <p>{dev.subtitle}</p>
            </span>
          </div>
        ))}
      </div>
      <div className={styles.desc}>{devsInfo[person].description}</div>
    </div>
  );
}
