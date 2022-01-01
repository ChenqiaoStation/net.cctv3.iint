import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Frameweork from "../framework";
import styles from "../../styles/Article.module.css";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Radio,
  Switch,
  DatePicker,
  Rate,
  Upload,
  TreeSelect,
  Checkbox,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { Host4NodeJS } from "../../x";
import TextInput from "../../components/TextInput";

export interface Article {
  id: number;
  slug: string;
  images: [];
  tags: string[];
  title: string;
  message: string;
  password?: string;
  status: number;
  createTime: string;
  updateTime?: string;
  likeCount?: number;
  lookCount?: number;
  discusses?: any[];
}

interface ArticleProps {}

const WriteArticle: React.FC<ArticleProps> = () => {
  const [tags, setTags] = useState<any>([]);
  const [article, setArticle] = useState<Article>(
    Object.assign({
      id: 1,
      slug: "",
      images: [],
      tags: ["C语言", "深度优先搜索"],
      title: [],
      message: "Hello World.",
      password: "",
      status: 1,
      createTime: "2022-01-23 12:34:56",
      updateTime: "",
      likeCount: 0,
      lookCount: 0,
      discusses: [],
    })
  );

  useEffect(() => {
    fetch(`${Host4NodeJS}/tags/selectTags`)
      .then((repsonse) => repsonse.json())
      .then((json) => {
        setTags(
          json.map(
            (_: { parent: any; children: string[] }, _index: number) => ({
              title: _.parent,
              value: _.parent,
              selectable: false,
              children: _.children.map((__, __index) => ({
                title: __,
                value: __,
              })),
            })
          )
        );
      });
    return () => {};
  }, []);

  /**
   * 旧的数组扁平化
   * @param tags
   * @returns
   */
  const serviceTags2TreeSelectTags = (tags: any[]) => {
    return tags.reduce((result, item, index, source) => {
      return result.concat(
        typeof item === "string"
          ? {
              label: item,
              value: item,
              select: Math.random() < 0.5,
            }
          : serviceTags2TreeSelectTags(item.children)
      );
    }, []);
  };

  /**
   * 任意表单发生变化时候
   * @param key
   * @param value
   */
  const onArticleChanged = (
    key: keyof Article | string,
    value: Article[keyof Article]
  ) => {
    setArticle((article) => {
      article[key] = value;
      return Object.assign({}, article);
    });
  };

  useEffect(() => {
    console.log(
      "🐞 ~ file: writeArticle.tsx ~ line 127 ~ useEffect ~ article",
      article
    );
    localStorage.setItem(new Date().toTimeString(), JSON.stringify(article));
    return () => {};
  }, [article]);

  return (
    <Frameweork>
      <Form className={styles.views} layout={"vertical"}>
        <Form.Item label="文章标题">
          <Input
            placeholder="请输入文章标题"
            value={article.title}
            onChange={(e) => {
              onArticleChanged("title", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="伪静态名">
          <Input
            placeholder="请输入伪静态名，将来用作链接 http://www.cctv3.net/article?slug=xxx"
            onChange={(e) => {
              onArticleChanged("title", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="文章头图">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={3}
          >
            <Button icon={<UploadOutlined />}>请上传文章缩略图</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="分类标签">
          <TreeSelect
            treeData={tags}
            multiple={true}
            value={article.tags}
            onSelect={(value) => {
              onArticleChanged("tags", article.tags.concat(value.toString()));
            }}
            onDeselect={(value) => {
              onArticleChanged(
                "tags",
                article.tags.filter((it) => it != value)
              );
            }}
            placeholder="请选择文章分类: 父级标签不可选"
          />
        </Form.Item>
        <Form.Item label="文章内容">
          <TextInput
            defaultValue={article.message}
            onChange={(text) => {
              onArticleChanged("message", text);
            }}
          />
        </Form.Item>
        <Form.Item label="是否公开">
          <Switch
            checked={article.status == 1}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked) => {
              onArticleChanged("status", checked ? 1 : 0);
            }}
            defaultChecked
          />
        </Form.Item>
        <Form.Item label="创作时间">
          <DatePicker
            renderExtraFooter={() => <div />}
            showTime
            placeholder="请选择时间"
            value={moment(article.createTime || new Date())}
            onChange={(moment, dateString) => {
              onArticleChanged("createTime", dateString);
            }}
          />
        </Form.Item>
        <Form.Item label="密码保护">
          <Input.Password
            placeholder="请输入密码，默认为: net.cctv3.i"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item label="优先级别: 数字越大优先级越高">
          <Rate
            value={article.id}
            character={({ index }) => index + 1}
            onChange={(score) => {
              onArticleChanged("id", score);
            }}
          />
        </Form.Item>
        <Form.Item label="发表文章">
          <Button type="primary" style={{ width: "100%" }} onClick={() => {}}>
            发表文章
          </Button>
        </Form.Item>
      </Form>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default WriteArticle;
