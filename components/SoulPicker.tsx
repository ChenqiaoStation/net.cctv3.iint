import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/SoulPicker.module.css";
import { Host4NodeJS } from "../x";
interface SoulPickerProps {
  show: boolean;
  onItemPress: (item: any) => void;
}

const SoulPicker: React.FC<SoulPickerProps> = (props) => {
  const [souls, setSouls] = useState([]);

  useEffect(() => {
    fetch(`${Host4NodeJS}/soul/selectSouls`, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        setSouls(json);
      });
    return () => {};
  }, [props.show]);

  return (
    props.show && (
      <div className={styles.views}>
        <div className={styles.viewItems}>
          {Array.from(souls, (_, i) => (
            <a
              onClick={() => {
                fetch(`${Host4NodeJS}/soul/updateSoulIndex`, {
                  method: "POST",
                  body: JSON.stringify({ name: _.name }),
                });
                props.onItemPress(_);
              }}
              key={i}
              className={styles.viewItem}
            >
              <img src={_.soul} className={styles.imageSoul} />
            </a>
          ))}
        </div>
      </div>
    )
  );
};

export default SoulPicker;
