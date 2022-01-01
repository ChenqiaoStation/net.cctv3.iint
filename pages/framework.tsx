import Link from "next/link";
import TextInput from "../components/TextInput";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import soulImages from "../utils/soul.json";
import { GetStaticProps } from "next";
import { Layout } from "antd";
import styles from "../styles/Framework.module.css";
const { Header, Footer, Content } = Layout;

import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export interface FrameworkProps {}

const pages = [
  {
    name: "博客管理",
    key: "www.cctv3.net",
    icon: <MailOutlined />,
    children: [
      { name: "文章分类", key: "keywords", page: "/editKeywords" },
      { name: "文章内容", key: "articles", page: "/editArticles" },
      { name: "相册分类", key: "albums", page: "/editAlbums" },
      { name: "相册内容", key: "pictures", page: "/editPictures" },
      { name: "链接管理", key: "links", page: "/editLinks" },
      { name: "时光管理", key: "timers", page: "/editTimers" },
      { name: "养鸡管理", key: "jj", page: "/editJJ" },
    ],
  },
  {
    name: "调试工具",
    key: "open.cctv3.net",
    icon: <MailOutlined />,
    children: [{ name: "日志收集", key: "logs", page: "/selectLogs" }],
  },
];
const Slider = () => {
  return (
    <Menu
      mode="inline"
      openKeys={Array.from(pages, (_, i) => _.key)}
      onOpenChange={(openKeys) => {}}
      style={{ width: 256 }}
    >
      {Array.from(pages, (_, i) => {
        let children = _.children;
        return (
          <SubMenu key={_.key} icon={_.icon} title={_.name}>
            {Array.from(children, (__, i) => (
              <Menu.Item
                onClick={(menu) => {
                  console.log(
                    "🐞 ~ file: framework.tsx ~ line 58 ~ Slider ~ menuInfo",
                    __
                  );
                }}
                key={__.key}
              >
                {__.name}
              </Menu.Item>
            ))}
          </SubMenu>
        );
      })}
    </Menu>
  );
};

const Frameweork: React.FC<FrameworkProps> = (props) => {
  return (
    <div className={styles.views}>
      <div className={styles.viewMainContainer}>
        <Slider />
        <div className={styles.viewContent}>{props.children}</div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Frameweork;
