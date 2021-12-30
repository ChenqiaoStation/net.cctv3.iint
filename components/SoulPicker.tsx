import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/SoulPicker.module.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "antd";

interface Item {
  _id: any;
  index: number;
  name: string;
  soul: string;
  keywords: string[];
}
type Props = {
  onItemPress: (item: Item) => void;
};

const SoulPicker = (props: Props) => {
  useEffect(() => {
    return () => {};
  }, []);
  return <div className={styles.views}></div>;
};

export default SoulPicker;