import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useState } from "react";
import { Picture } from "../../interfaces";
import styles from "../../styles/Article.module.css";
import { Host4NodeJS, Host4Springboot, useHttpPost, useUUID } from "../../x";
import Frameweork from "../framework";

interface UploadPicturesProps {}

const WriteArticle: React.FC<UploadPicturesProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);

  return (
    <Frameweork>
      <Form className={styles.views} layout={"vertical"}>
        <div style={{ fontSize: 18, color: "#333" }}>提示: </div>
        <div style={{ color: "#ff5252" }}>
          为了防止以后乱了，图片上传以前统一用 useUUID 来个 8 位的
          ID，然后重命名一下。
        </div>
        <div style={{ height: 12 }} />
        <Form.Item label="文章头图">
          <Upload
            action={`${Host4Springboot}/fileUploader.action`}
            listType="picture"
            maxCount={10}
            multiple={true}
            data={{ target: "net.cctv3.next/picture" }}
            onChange={(e) => {
              setPictures(
                Array.from(e.fileList)
                  .filter((it) => it.status == "done")
                  .map((it) => ({
                    id: useUUID(),
                    file: it.name,
                    title: it.name.substring(0, 16),
                    message: "",
                    status: true,
                    createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    updateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                  }))
              );
            }}
          >
            <Button icon={<UploadOutlined />}>请上传图骗</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="上传所有图骗">
          <Button
            type="primary"
            style={{ width: "100%" }}
            loading={loading}
            onClick={async () => {
              setLoading(true);
              await useHttpPost(
                `${Host4NodeJS}/album/insertPictures`,
                JSON.stringify({ id: router.query.id, data: pictures })
              );
              router.back();
            }}
          >
            确认上传
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
