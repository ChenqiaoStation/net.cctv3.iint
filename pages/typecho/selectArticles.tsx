import { Table, Input, Button, Switch } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Article } from "../../interfaces";
import { Host4NodeJS } from "../../x";
import Frameweork from "../framework";
import styles from "../../styles/SelectArticles.module.css";

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
            navigate2WritePage(id);
          }}
        >
          {id}
        </a>
      ),
    },
    { title: "标题", dataIndex: "title", key: "title" },
    { title: "缩略名", dataIndex: "slug", key: "slug" },
    { title: "标签", dataIndex: "tags", key: "tags" },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <Switch checked={status} />,
    },
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

  /**
   * 跳转到 WritePage 页面
   * @param id
   */
  const navigate2WritePage = (id?: string) => {
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
  };

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
      <div className={styles.viewHeader}>
        <Input.Search
          placeholder="请输入关键字进行搜索"
          allowClear
          onSearch={() => {}}
          style={{ flex: 1 }}
        />
        <div style={{ width: 16 }} />
        <Button
          type="primary"
          onClick={() => {
            navigate2WritePage();
          }}
        >
          新建文章
        </Button>
      </div>
      <div style={{ height: 16 }} />
      <Table
        dataSource={articles}
        columns={columns}
        bordered={true}
        size="small"
      />
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectArticles);