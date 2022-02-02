import { Table, Input, Button, Switch, Popover, Tooltip } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Article, WebParent } from "../../interfaces";
import { Host4NodeJS, useHttpGet } from "../../x";
import Frameweork from "../framework";
import styles from "../../styles/SelectArticles.module.css";

interface WebsProps {}

const SelectWebs: React.FC<WebsProps> = (props) => {
  const router = useRouter();

  const [webs, setWebs] = useState<WebParent[]>([]);
  const columns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <a>{id}</a>,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <Tooltip title={title}>
          <div>{title.substring(0, 32)}</div>
        </Tooltip>
      ),
    },
    {
      title: "简介",
      dataIndex: "message",
      key: "message",
      render: (message: string) => (
        <Tooltip title={message}>
          <div>
            {message.length > 16 ? message.substring(0, 16) + "..." : message}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "序号",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <Switch checked={status} />,
    },
    {
      title: "链接",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <Tooltip title={url}>
          <div>{url.substring(0, 16)}</div>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      setWebs(await useHttpGet(`${Host4NodeJS}/web/selectWebs?i=true`));
    })();
    return () => {};
  }, []);

  return (
    <Frameweork>
      <div>
        {Array.from(webs, (_, i) => (
          <div key={i}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 16, color: "#333", fontWeight: "bold" }}
                >
                  {_.title}
                </div>
                <div style={{ fontSize: 14, color: "#444" }}>{_.message}</div>
              </div>
              <Button onClick={() => {}} type="primary">
                新增链接
              </Button>
            </div>

            <Table
              dataSource={_.children}
              columns={columns}
              bordered={true}
              size="small"
              rowKey={(web) => web.id}
            />
            <div style={{ height: 16 }} />
          </div>
        ))}
      </div>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectWebs);
