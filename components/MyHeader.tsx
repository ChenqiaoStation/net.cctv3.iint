import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";

interface HeaderProps {}

const MyHeader: React.FC<HeaderProps> = (props) => {
  return (
    <div className={styles.views}>
      <img src="/site.png" className={styles.imageSiteLogo} />
    </div>
  );
};

export default MyHeader;
