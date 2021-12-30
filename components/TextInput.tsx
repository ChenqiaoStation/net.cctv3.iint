import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/TextInput.module.css";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { User } from "../interfaces";
import dynamic from "next/dynamic";
import { Button } from "antd";

type Props = {};

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const CustomButton = () => <div>表情</div>;

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <button>
      <CustomButton />
    </button>
  </div>
);

const TextInput = (props: Props) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <div id="toolbar">
        <a
          className={styles.viewDogeContainer}
          onClick={() => {
            console.log("Hello World.");
          }}
        >
          <img src="/soulDoge.png" className={styles.imageDoge} />
          <div>Soul 表情</div>
        </a>
      </div>
      <ReactQuill
        value={value}
        onChange={(content, delta, source, editor) => {
          console.log(content);
          console.log(delta);
          console.log(source);
          console.log(editor.getText());
        }}
        modules={TextInput.modules}
      />
    </div>
  );
};

TextInput.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertStar: insertStar,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

export default TextInput;
