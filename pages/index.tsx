import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Frameweork from "./framework";
import _ from "lodash";

import TestGroupByDatas from "../data/TestGroupBy.json";
import moment from "moment";

const IndexPage = () => {
  useEffect(() => {
    const _datas = _.groupBy(TestGroupByDatas, (it) =>
      it.createTime.substring(0, "YYYY-MM".length)
    );
    console.log("🐞 ~ file: index.tsx ~ line 16 ~ useEffect ~ _datas", _datas)
    let datas = Object.keys(_datas)
      .map((it) => ({
        parent: it,
        children: _datas[it],
      }))
      .sort((a, b) => (moment(a.parent).isBefore(moment(b.parent)) ? 1 : -1));
    console.log("🐞 ~ file: index.tsx ~ line 23 ~ useEffect ~ result", datas);
    return () => {};
  }, []);

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
