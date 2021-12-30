import Link from "next/link";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import "antd/dist/antd.css";
import { useEffect } from "react";
import soulImages from "../utils/soul.json";
import { GetStaticProps } from "next";
const fs = require("fs");

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <TextInput />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: any = [];
  Array.from(soulImages.data.emojiList, async (_, i) => {
    fetch(_.emojiResourceUrl)
      .then((response) => response.blob())
      .then(async (blob) => {
        var buffer = await blob.arrayBuffer();
        buffer = Buffer.from(buffer);
        fs.createWriteStream(`${_.emojiName}.png`).write(buffer);
      });
  });
  return { props: { items } };
};

export default IndexPage;
