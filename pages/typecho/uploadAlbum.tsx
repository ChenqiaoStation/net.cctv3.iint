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
import { Album, Article } from "../../interfaces";

interface UploadAlbumProps {}

const WriteArticle: React.FC<UploadAlbumProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState<Album>(
    Object.assign({
      id: useUUID(),
      file: "",
      title: "",
      message: "",
      status: true,
      isGroup: false,
      password: "",
      score: 1,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      updateTime: "",
      children: [],
    })
  );

  useEffect(() => {
    fetch(`${Host4NodeJS}/albums/selectAlbum?id=${router.query.id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 1) {
          setAlbum(Object.assign({}, album, json.data));
        }
      });
    return () => {};
  }, [router]);

  /**
   * 任意表单发生变化时候
   * @param key
   * @param value
   */
  const useArticleChanged = (
    key: keyof Album | string,
    value: Album[keyof Album]
  ) => {
    setAlbum((album) => {
      album.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
      album[key] = value;
      return Object.assign({}, album);
    });
  };

  return (
    <Frameweork>
      <Form className={styles.views} layout={"vertical"}>
        <Form.Item label="相册标题">
          <Input
            placeholder="请输入相册标题"
            value={album.title}
            onChange={(e) => {
              useArticleChanged("title", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="相册描述">
          <Input
            value={album.message}
            placeholder="请输入相册描述"
            onChange={(e) => {
              useArticleChanged("message", e.target.value);
            }}
          />
        </Form.Item>
        {album.isGroup ? (
          <div />
        ) : (
          <Form.Item label="文章头图">
            <Upload
              action={`${Host4Springboot}/fileUploader.action`}
              listType="picture"
              maxCount={1}
              multiple={true}
              data={{ target: "net.cctv3.next/cover" }}
              onChange={(e) => {
                useArticleChanged("file", e.fileList[0].name);
              }}
            >
              <Button icon={<UploadOutlined />}>请上传相册封面</Button>
            </Upload>
          </Form.Item>
        )}
        <Form.Item label="是否公开">
          <Switch
            checked={album.status}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked) => {
              useArticleChanged("status", checked);
            }}
          />
        </Form.Item>
        <Form.Item label="是否 Group: 如果选是，则只在 Parent 页面以 Banner 轮播的形式展示。">
          <Switch
            checked={album.isGroup}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked) => {
              useArticleChanged("isGroup", checked);
            }}
          />
        </Form.Item>
        <Form.Item label="创作时间">
          <DatePicker
            renderExtraFooter={() => <div />}
            showTime
            placeholder="请选择时间"
            value={moment(album.createTime || new Date())}
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
        <Form.Item label="优先级别: 数字越大优先级越高。">
          <Rate
            value={album.score}
            character={({ index }) => index + 1}
            onChange={(score) => {
              useArticleChanged("score", score);
            }}
          />
        </Form.Item>
        <Form.Item label="创建 / 修改相册">
          <Button
            type="primary"
            style={{ width: "100%" }}
            loading={loading}
            onClick={() => {
              setLoading(true);
              fetch(`${Host4NodeJS}/albums/updateAlbum`, {
                method: "POST",
                body: JSON.stringify(album),
              }).then((response) => {
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
