import { Button, Input, Modal, Rate, Switch, Table, Tooltip } from "antd";
import "antd/dist/antd.css";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormItem from "../../components/FormItem";
import { WebChild, WebParent } from "../../interfaces";
import { Host4NodeJS, useHttpGet, useHttpPost, useUUID } from "../../x";
import Frameweork from "../framework";

interface WebsProps {}

const SelectWebs: React.FC<WebsProps> = (props) => {
  const router = useRouter();
  const [r, setR] = useState(Math.random());
  const [webs, setWebs] = useState<WebParent[]>([]);
  const [web, setWeb] = useState<WebChild>(
    Object.create({
      id: useUUID(),
      title: "",
      message: "",
      score: 1,
      status: true,
      url: "",
    })
  );
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [parent, setParent] = useState<WebParent>(Object.create(null));
  const [id, setId] = useState("");

  const columns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <a
          onClick={() => {
            setId(id);
            setIsShowUpdateModal(true);
          }}
        >
          {id}
        </a>
      ),
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
    },
  ];

  useEffect(() => {
    (async () => {
      setWebs(await useHttpGet(`${Host4NodeJS}/web/selectWebs?i=true`));
    })();
    return () => {};
  }, [r]);

  useEffect(() => {
    for (let i = 0; i < webs.length; i++) {
      let _children = webs[i].children;
      for (let j = 0; j < _children.length; j++) {
        if (_children[j].id == id) {
          setParent(webs[i]);
          setWeb(_children[j]);
        }
      }
    }
    return () => {};
  }, [id]);

  const useWebChanged = (key: string, value: any) => {
    let _web = Object.assign({}, web);
    _web[key] = value;
    setWeb(_web);
  };

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
              <Button
                onClick={() => {
                  setParent(_);
                  setIsShowUpdateModal(true);
                  useWebChanged("id", useUUID());
                }}
                type="primary"
              >
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
      <Modal
        visible={isShowUpdateModal}
        title={`${web.id}`}
        onOk={async () => {
          let _children = [...parent.children];
          let index = _children.findIndex((it) => it.id == web.id);
          if (index >= 0) {
            // 编辑
            _children[index] = web;
          } else {
            // 新增
            _children.push(web);
          }
          let _parent = JSON.parse(JSON.stringify(parent));
          _parent.children = _children;
          await useHttpPost(
            `${Host4NodeJS}/web/updateWeb`,
            JSON.stringify(_parent)
          );
          setR(Math.random());
          setIsShowUpdateModal(false);
        }}
        onCancel={() => {
          setIsShowUpdateModal(false);
        }}
      >
        <FormItem title="标题">
          <Input
            placeholder="请输入网站标题"
            value={web.title}
            onChange={(e) => {
              useWebChanged("title", e.target.value);
            }}
          />
        </FormItem>

        <FormItem title="描述">
          <Input
            value={web.message}
            placeholder="请输入网站描述"
            onChange={(e) => {
              useWebChanged("message", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="链接">
          <Input
            value={web.url}
            placeholder="请输入链接"
            onChange={(e) => {
              useWebChanged("url", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="优先级别: 数字越大优先级越高">
          <Rate
            value={web.score}
            character={({ index }) => index + 1}
            onChange={(score) => {
              useWebChanged("score", score);
            }}
          />
        </FormItem>
        <FormItem title="状态">
          <Switch
            style={{ width: 32 }}
            checked={web.status}
            onChange={(checked) => {
              useWebChanged("status", checked);
            }}
          />
        </FormItem>
      </Modal>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectWebs);
