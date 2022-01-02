import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
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
import { Host4NodeJS, Host4Springboot, useUUID } from "../../x";
import TextInput from "../../components/TextInput";
import { useRouter, withRouter } from "next/router";
import { Article } from "../../interfaces";

interface ArticleProps {}

const WriteArticle: React.FC<ArticleProps> = (props) => {
  const router = useRouter();
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [article, setArticle] = useState<Article>(
    Object.assign({
      id: useUUID(),
      slug: "",
      images: [],
      tags: [],
      title: [],
      message: "",
      password: "",
      status: 1,
      score: 1,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      updateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
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
  const useArticleChanged = (
    key: keyof Article | string,
    value: Article[keyof Article]
  ) => {
    setArticle((article) => {
      article[key] = value;
      return Object.assign({}, article);
    });
  };

  useEffect(() => {
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
              useArticleChanged("title", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="伪静态名">
          <Input
            placeholder="请输入伪静态名，将来用作链接 http://www.cctv3.net/article?slug=xxx"
            onChange={(e) => {
              useArticleChanged("slug", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="文章头图">
          <Upload
            action={`${Host4Springboot}/fileUploader.action`}
            listType="picture"
            maxCount={3}
            data={{ target: "net.cctv3.next/cover" }}
            onChange={(e) => {
              useArticleChanged(
                "images",
                e.fileList
                  .filter((it) => it.status == "done")
                  .map((it) => it.name)
              );
            }}
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
              useArticleChanged("tags", article.tags.concat(value.toString()));
            }}
            onDeselect={(value) => {
              useArticleChanged(
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
              useArticleChanged("message", text);
            }}
          />
        </Form.Item>
        <Form.Item label="是否公开">
          <Switch
            checked={article.status == 1}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked) => {
              useArticleChanged("status", checked ? 1 : 0);
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
              useArticleChanged("createTime", dateString);
            }}
          />
        </Form.Item>
        <Form.Item label="密码保护">
          <Input.Password
            placeholder="请输入密码，默认为: net.cctv3.i"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => {
              useArticleChanged("password", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="优先级别: 数字越大优先级越高">
          <Rate
            value={article.score}
            character={({ index }) => index + 1}
            onChange={(score) => {
              useArticleChanged("score", score);
            }}
          />
        </Form.Item>
        <Form.Item label="发表文章">
          <Button
            type="primary"
            style={{ width: "100%" }}
            loading={loading}
            onClick={() => {
              setLoading(true);
              fetch(`${Host4NodeJS}/articles/updateArticle`, {
                method: "POST",
                body: JSON.stringify(article),
              })
                .then((response) => response.json())
                .then((response) => {
                  router.back();
                });
            }}
          >
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

export default withRouter(WriteArticle);
