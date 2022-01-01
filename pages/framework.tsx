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
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { GetStaticProps } from "next";
import React from "react";
import MyHeader from "../components/MyHeader";
import styles from "../styles/Framework.module.css";
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
    key: "Blog",
    icon: <GithubOutlined />,
    children: [
      {
        name: "文章分类",
        key: "keywords",
        page: "/editKeywords",
        icon: <TagsOutlined />,
      },
      {
        name: "文章内容",
        key: "articles",
        page: "/editArticles",
        icon: <EditOutlined />,
      },
      {
        name: "相册分类",
        key: "albums",
        page: "/editAlbums",
        icon: <FolderOpenOutlined />,
      },
      {
        name: "相册内容",
        key: "pictures",
        page: "/editPictures",
        icon: <PictureOutlined />,
      },
      {
        name: "链接管理",
        key: "links",
        page: "/editLinks",
        icon: <SortDescendingOutlined />,
      },
      {
        name: "时光管理",
        key: "timers",
        page: "/editTimers",
        icon: <ClockCircleOutlined />,
      },
      {
        name: "养鸡管理",
        key: "jj",
        page: "/editJJ",
        icon: <DotChartOutlined />,
      },
      {
        name: "评论管理",
        key: "discusses",
        page: "/editDiscusses",
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
  const [openKeys, setOpenKeys] = React.useState(
    Array.from(pages, (_, i) => _.key)
  );

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (Array.from(pages, (_, i) => _.key).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
      {Array.from(pages, (_, i) => {
        let children = _.children;
        return (
          <SubMenu key={_.key} icon={_.icon} title={_.name}>
            {Array.from(children, (__, i) => (
              <Menu.Item icon={__.icon} onClick={(menu) => {}} key={__.key}>
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
