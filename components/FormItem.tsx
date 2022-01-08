import React, { createRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../styles/TextInput.module.css";
import { Button } from "antd";
import SoulPicker from "./SoulPicker";
import TextArea from "antd/lib/input/TextArea";
import { useOSS } from "../x";

interface FormItemProps {
  title: string;
  message?: string;
}

const FormItem: React.FC<FormItemProps> = (props) => {
  return (
    <div style={{ flexDirection: "column", display: "flex", margin: "12px 0" }}>
      <div style={{ fontSize: 16, color: "#333333" }}>{props.title}</div>
      <div style={{ height: 4 }} />
      {props.children}
    </div>
  );
};

export default FormItem;
