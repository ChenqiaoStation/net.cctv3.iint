import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Frameweork from "./../framework";
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
  PlusOutlined,
} from "@ant-design/icons";
import { Host4NodeJS } from "../../x";
import TextInput from "../../components/TextInput";

const Article = () => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState<any>([]);

  useEffect(() => {
    fetch(`${Host4NodeJS}/tags/selectTags`)
      .then((repsonse) => repsonse.json())
      .then((json) => {
        setTags(
          json.map(
            (_: { parent: any; children: string[] }, _index: number) => ({
              title: _.parent,
              value: _index,
              key: _index,
              selectable: false,
              children: _.children.map((__, __index) => ({
                title: __,
                value: `${_index}-${__index}`,
                key: `${_index}-${__index}`,
              })),
            })
          )
        );
      });
    return () => {};
  }, []);

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

  return (
    <Frameweork>
      <Form
        className={styles.views}
        layout={"vertical"}
        form={form}
        onValuesChange={(changedValues, values) => {}}
      >
        <Form.Item label="文章标题">
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item label="伪静态名">
          <Input placeholder="请输入伪静态名，将来用作链接 http://www.cctv3.net/article?slug=xxx" />
        </Form.Item>
        <Form.Item label="文章头图">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>请上传文章缩略图</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="分类标签">
          <TreeSelect
            treeData={tags}
            multiple={true}
            placeholder="请选择文章分类: 父级标签不可选"
          />
        </Form.Item>
        <Form.Item label="文章内容">
          <TextInput />
        </Form.Item>
        <Form.Item label="是否公开">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </Form.Item>
        <Form.Item label="创作时间">
          <DatePicker
            renderExtraFooter={() => <div />}
            showTime
            placeholder="请选择时间"
            defaultValue={moment()}
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
          <Rate defaultValue={1} character={({ index }) => index + 1} />
        </Form.Item>
      </Form>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Article;
