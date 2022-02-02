import {
  TagsOutlined,
  BugOutlined,
  DashboardOutlined,
  GithubOutlined,
  CommentOutlined,
  DotChartOutlined,
  ClockCircleOutlined,
  SortDescendingOutlined,
  FolderOpenOutlined,
  PictureOutlined,
  EditOutlined,
  SlackOutlined,
  CodeOutlined,
  ChromeOutlined,
} from "@ant-design/icons";

import { Layout, Menu, message, notification } from "antd";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";

const { Header, Content, Footer, Sider } = Layout;

const pages = [
  {
    name: "服务总览",
    key: "Home",
    icon: <SlackOutlined />,
    children: [
      {
        name: "科学管理",
        key: "home",
        page: "/home",
        icon: <DashboardOutlined />,
      },
    ],
  },
  {
    name: "博客管理",
    key: "typecho",
    icon: <GithubOutlined />,
    children: [
      {
        name: "文章分类",
        key: "keywords",
        page: "/",
        icon: <TagsOutlined />,
      },
      {
        name: "文章内容",
        key: "articles",
        page: "/selectArticles",
        icon: <EditOutlined />,
      },
      {
        name: "相册分类",
        key: "albums",
        page: "/selectAlbums",
        icon: <FolderOpenOutlined />,
      },
      {
        name: "链接管理",
        key: "links",
        page: "/selectWebs",
        icon: <SortDescendingOutlined />,
      },
      {
        name: "歌曲管理",
        key: "timers",
        page: "/selectMusics",
        icon: <ChromeOutlined />,
      },
      {
        name: "评论管理",
        key: "discusses",
        page: "/",
        icon: <CommentOutlined />,
      },
    ],
  },
  {
    name: "调试工具",
    key: "Debug",
    icon: <BugOutlined />,
    children: [
      {
        name: "日志收集",
        key: "logs",
        page: "/selectLogs",
        icon: <CodeOutlined />,
      },
    ],
  },
];

const { SubMenu } = Menu;

export interface FrameworkProps {}

const Slider = () => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(["discusses"]);
  const [openKeys, setOpenKeys] = React.useState(
    Array.from(pages, (_, i) => _.key)
  );

  useEffect(() => {
    setSelectedKeys([localStorage.getItem("selectedKey")]);
    return () => {};
  }, [router]);

  return (
    <Menu mode="inline" openKeys={openKeys} selectedKeys={selectedKeys}>
      {Array.from(pages, (_, i) => {
        let children = _.children;
        return (
          <SubMenu key={_.key} icon={_.icon} title={_.name}>
            {Array.from(children, (__, i) => (
              <Menu.Item
                icon={__.icon}
                onClick={(menu) => {
                  if (__.page == "/") {
                    notification.error({
                      message: `${__.key} for ${__.name} not found.`,
                    });
                  } else {
                    localStorage.setItem("selectedKey", __.key);
                    __.page != "/" &&
                      router.push(`/${_.key}/${__.page}`, undefined, {
                        shallow: true,
                      });
                  }
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
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <MyHeader />
      </Header>
      <Layout
        className="site-layout"
        style={{ marginLeft: 268, marginTop: 64 }}
      >
        <Sider
          width={268}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            paddingLeft: 32,
            backgroundColor: "white",
          }}
        >
          <Slider />
        </Sider>
        <Content
          style={{
            overflow: "initial",
            padding: 32,
          }}
        >
          {props.children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Frameweork;
