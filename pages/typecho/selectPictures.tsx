import { Button, Card, Form, Image, Input, Modal, Switch } from "antd";
import "antd/dist/antd.css";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Picture } from "../../interfaces";
import { Host4NodeJS, useOSS } from "../../x";
import Frameweork from "../framework";
import styles from "../../styles/SelectPictures.module.css";
import moment from "moment";

interface SelectPicturesProps {}

const SelectPictures: React.FC<SelectPicturesProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [selectItem, setSelectItem] = useState<Picture>(Object.create(null));
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

  useEffect(() => {
    loadDatas();
    return () => {};
  }, [router]);

  const loadDatas = () => {
    fetch(`${Host4NodeJS}/albums/selectAlbum?id=${router.query.id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 1) {
          setPictures(json.data.children);
        }
      });
  };

  /**
   * 表单改变的时候
   * @param key
   * @param value
   */
  const usePictureChanged = (key: string, value: any) => {
    let item = Object.assign({}, selectItem);
    item[key] = value;
    setSelectItem(item);
  };

  useEffect(() => {
    let index = pictures.findIndex((it) => it.id == selectItem.id);
    let _pictures = Array.from(pictures);
    if (index >= 0) {
      _pictures[index] = selectItem;
      setPictures(_pictures);
    }
    return () => {};
  }, [selectItem]);

  return (
    <Frameweork>
      <div className={styles.viewHeader}>
        <Input.Search
          placeholder="请输入关键字进行搜索"
          allowClear
          onSearch={() => {}}
          style={{ flex: 1 }}
        />
        <div style={{ width: 16 }} />
        <Button
          type="primary"
          onClick={() => {
            router.push(
              {
                pathname: `/typecho/uploadPictures`,
                query: {
                  id: router.query.id,
                },
              },
              undefined,
              { shallow: false }
            );
          }}
        >
          上传照骗
        </Button>
      </div>
      <div style={{ height: 16 }} />
      <Card title={"所有照骗"}>
        {Array.from(pictures, (_, i) => (
          <Card.Grid
            key={i}
            style={{ width: "15%", flexDirection: "column", display: "flex" }}
          >
            <div className={styles.textTitle}>{_.title || _.file}</div>
            <Image
              className={styles.image}
              src={useOSS({
                project: "net.cctv3.next",
                target: "picture",
                file: _.file,
              })}
            />
            <div className={styles.viewBottom}>
              <div className={styles.textTime}>
                {moment(_.createTime).fromNow()}
              </div>
              <div className={styles.viewBottomOperate}>
                <Switch checked={_.status} size="small" />
                <a
                  onClick={() => {
                    setSelectItem(_);
                    setIsShowUpdateModal(true);
                  }}
                >
                  编辑
                </a>
              </div>
            </div>
          </Card.Grid>
        ))}
      </Card>
      <Modal
        visible={isShowUpdateModal}
        title={selectItem.title}
        onOk={() => {
          fetch(`${Host4NodeJS}/albums/updatePicture`, {
            method: "POST",
            body: JSON.stringify({ id: router.query.id, data: pictures }),
          })
            .then((response) => response.json())
            .then((json) => {
              setIsShowUpdateModal(false);
              loadDatas();
            });
        }}
        onCancel={() => {
          setIsShowUpdateModal(false);
        }}
      >
        <Form.Item label="相册标题">
          <Input
            placeholder="请输入相册标题"
            value={selectItem.title}
            onChange={(e) => {
              usePictureChanged("title", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="相册描述">
          <Input
            value={selectItem.message}
            placeholder="请输入相册描述"
            onChange={(e) => {
              usePictureChanged("message", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="是否公开">
          <Switch
            checked={selectItem.status}
            onChange={(checked) => {
              usePictureChanged("status", checked);
            }}
          />
        </Form.Item>
      </Modal>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectPictures);
