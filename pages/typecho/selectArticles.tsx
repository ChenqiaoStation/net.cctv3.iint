import {
  Table
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Article } from "../../interfaces";
import { Host4NodeJS } from "../../x";
import Frameweork from "../framework";

interface ArticleProps {}

const SelectArticles: React.FC<ArticleProps> = (props) => {
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const columns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <a
          onClick={() => {
            router.push(
              {
                pathname: "/typecho/writeArticle",
                query: {
                  id: id,
                },
              },
              undefined,
              { shallow: false }
            );
          }}
        >
          {id}
        </a>
      ),
    },
    { title: "标题", dataIndex: "title", key: "title" },
    { title: "缩略名", dataIndex: "slug", key: "slug" },
    { title: "标签", dataIndex: "tags", key: "tags" },
    { title: "状态", dataIndex: "status", key: "status" },
    { title: "序号", dataIndex: "score", key: "score" },
    { title: "浏览", dataIndex: "lookCount", key: "lookCount" },
    { title: "评论", dataIndex: "discusses", key: "discusses" },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (createTime: string) => <div>{moment(createTime).fromNow()}</div>,
    },
    {
      title: "修改时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (updateTime: string) => <div>{moment(updateTime).fromNow()}</div>,
    },
  ];

  useEffect(() => {
    fetch(`${Host4NodeJS}/articles/selectArticles`)
      .then((repsonse) => repsonse.json())
      .then((json) => {
        setArticles(json);
      });
    return () => {};
  }, []);

  return (
    <Frameweork>
      <Table dataSource={articles} columns={columns} size="small" />
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectArticles);
