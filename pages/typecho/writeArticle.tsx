import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Frameweork from "../framework";
import styles from "../../styles/Article.module.css";
import moment from "moment";
import {
  Input,
  Button,
  Radio,
  Switch,
  DatePicker,
  Rate,
  Upload,
  TreeSelect,
  Checkbox,
  message,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Host4NodeJS,
  Host4Springboot,
  useHttpGet,
  useHttpPost,
  useUUID,
} from "../../x";
import TextInput from "../../components/TextInput";
import { useRouter, withRouter } from "next/router";
import { Article } from "../../interfaces";
import FormItem from "../../components/FormItem";
import TextArea from "antd/lib/input/TextArea";

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
      title: "",
      message: "",
      password: "",
      status: true,
      independent: false,
      score: 1,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      updateTime: "",
      likeCount: 0,
      lookCount: 0,
      discussCount: 0,
    })
  );

  useEffect(() => {
    (async () => {
      let result = await useHttpGet(`${Host4NodeJS}/tag/selectTags`);
      setTags(
        result.map(
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
    })();
    return () => {};
  }, []);

  useEffect(() => {
    message.info("🐞: " + "article id = " + router.query.id);
    (async () => {
      let result = await useHttpGet(
        `${Host4NodeJS}/article/selectArticle?id=${router.query.id}`
      );
      if (result.status == 1) {
        setArticle(Object.assign({}, article, result.data));
      }
    })();
    return () => {};
  }, [router]);

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
              title: item,
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
      article.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
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
      <div className={styles.views}>
        <FormItem title="文章标题">
          <Input
            placeholder="请输入文章标题"
            value={article.title}
            onChange={(e) => {
              useArticleChanged("title", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="伪静态名">
          <Input
            value={article.slug}
            placeholder="请输入伪静态名，将来用作链接 http://www.cctv3.net/article?slug=xxx"
            onChange={(e) => {
              useArticleChanged("slug", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="文章头图">
          <Upload
            action={`${Host4Springboot}/fileUploader.action`}
            listType="picture"
            maxCount={3}
            multiple={true}
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
        </FormItem>
        <FormItem title="分类标签">
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
        </FormItem>
        <FormItem title="文章内容">
          <TextInput
            value={article.message}
            onChange={(text) => {
              useArticleChanged("message", text);
            }}
          />
        </FormItem>
        <FormItem title="是否公开">
          <Switch
            style={{ width: 32 }}
            checked={article.status}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked) => {
              useArticleChanged("status", checked);
            }}
            defaultChecked
          />
        </FormItem>
        <FormItem title="是否独立页面">
          <Switch
            style={{ width: 32 }}
            checked={article.independent}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked) => {
              useArticleChanged("independent", checked);
            }}
            defaultChecked
          />
        </FormItem>
        <FormItem title="创作时间">
          <DatePicker
            renderExtraFooter={() => <div />}
            showTime
            placeholder="请选择时间"
            value={moment(article.createTime || new Date())}
            onChange={(moment, dateString) => {
              useArticleChanged("createTime", dateString);
            }}
          />
        </FormItem>
        <FormItem title="密码保护">
          <Input.Password
            value={article.password}
            placeholder="请输入密码，默认为: net.cctv3.i"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => {
              useArticleChanged("password", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="优先级别: 数字越大优先级越高">
          <Rate
            value={article.score}
            character={({ index }) => index + 1}
            onChange={(score) => {
              useArticleChanged("score", score);
            }}
          />
        </FormItem>
        <FormItem title="发表文章">
          <Button
            type="primary"
            style={{ width: "100%" }}
            loading={loading}
            onClick={async () => {
              setLoading(true);
              await useHttpPost(
                `${Host4NodeJS}/article/updateArticle`,
                JSON.stringify(article)
              );
              router.back();
            }}
          >
            发表文章
          </Button>
        </FormItem>
      </div>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(WriteArticle);
