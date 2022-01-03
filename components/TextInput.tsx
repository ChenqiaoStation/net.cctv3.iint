import React, { createRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../styles/TextInput.module.css";
import { Button } from "antd";
import SoulPicker from "./SoulPicker";
import TextArea from "antd/lib/input/TextArea";
import { useOSS } from "../x";

interface TextInputProps {
  onChange: (text: string) => void;
  defaultValue: string;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const [value, setValue] = useState(props.defaultValue);
  const [isShowSoul, setIsShowSoul] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    props.onChange(value);
    return () => {};
  }, [value]);

  return (
    <div>
      <a
        className={styles.viewDogeContainer}
        onClick={() => {
          setIsShowSoul(!isShowSoul);
          console.log("Hello World.");
        }}
      >
        <img
          src={useOSS({
            project: "net.cctv3.next",
            target: "config",
            file: "SoulDog.png",
          })}
          className={styles.imageDoge}
        />
        <div>Soul 表情</div>
      </a>
      <SoulPicker
        show={isShowSoul}
        onItemPress={(item) => {
          // insertStar(`::${item.name}::`);
          let soul = `::${item.name}::`;
          let s1 = value.substring(0, cursorPosition);
          let s2 = value.substring(cursorPosition);
          setValue(s1 + soul + s2);
          setIsShowSoul(false);
        }}
      />
      <TextArea
        value={value}
        autoSize={true}
        showCount={true}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onSelect={(e) => {
          setCursorPosition(e.currentTarget.selectionStart);
        }}
      />
    </div>
  );
};

export default TextInput;
