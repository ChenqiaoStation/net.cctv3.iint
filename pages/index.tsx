import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { Layout } from "antd";
import Frameweork from "./framework";

const IndexPage = () => {
  return (
    <Frameweork>
      <div>Hello World.</div>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default IndexPage;
