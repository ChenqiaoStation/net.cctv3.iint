import { Table, Input, Button, Switch } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Album, Article } from "../../interfaces";
import { Host4NodeJS } from "../../x";
import Frameweork from "../framework";
import styles from "../../styles/SelectAlbums.module.css";

interface ArticleProps {}

const SelectAlbums: React.FC<ArticleProps> = (props) => {
  const router = useRouter();

  const [albums, setAlbums] = useState<Album[]>([]);
  const columns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
    },
    { title: "标题", dataIndex: "title", key: "title" },
    { title: "描述", dataIndex: "message", key: "message" },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <Switch checked={status} />,
    },
    {
      title: "轮播",
      dataIndex: "isGroup",
      key: "isGroup",
      render: (isGroup: boolean) => <Switch checked={isGroup} />,
    },
    { title: "密码", dataIndex: "password", key: "password" },
    {
      title: "图片数量",
      dataIndex: "children",
      key: "children",
      render: (children: any[]) => (
        <a
          onClick={() => {
            navigate("selectPictures");
          }}
        >
          {children.length}
        </a>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (createTime: string) => moment(createTime).fromNow(),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (updateTime: string) => moment(updateTime).fromNow(),
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "updateAlbum",
      render: (id: string) => (
        <div className={styles.viewButtons}>
          <a
            onClick={() => {
              navigate("uploadAlbum", id);
            }}
          >
            编辑相册
          </a>
          <div style={{ width: 16 }} />
          <a
            onClick={() => {
              navigate("selectPictures", id);
            }}
          >
            管理图骗
          </a>
        </div>
      ),
    },
  ];

  /**
   * 跳转页面
   * @param id
   */
  const navigate = (page: "uploadAlbum" | "selectPictures", id?: string) => {
    router.push(
      {
        pathname: `/typecho/${page}`,
        query: {
          id: id,
        },
      },
      undefined,
      { shallow: false }
    );
  };

  useEffect(() => {
    fetch(`${Host4NodeJS}/albums/selectAlbums`)
      .then((repsonse) => repsonse.json())
      .then((json) => {
        setAlbums(json);
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
            navigate("uploadAlbum");
          }}
        >
          新建相册
        </Button>
      </div>
      <div style={{ height: 16 }} />
      <Table
        columns={columns}
        dataSource={albums}
        bordered={true}
        size="small"
      />
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectAlbums);
