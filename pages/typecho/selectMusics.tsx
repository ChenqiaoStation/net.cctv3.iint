import { Table, Input, Button, Switch, Modal } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Article, Music } from "../../interfaces";
import { Host4NodeJS, useHttpGet, useHttpPost, useUUID } from "../../x";
import Frameweork from "../framework";
import styles from "../../styles/SelectArticles.module.css";
import FormItem from "../../components/FormItem";

interface MusicProps {}

const SelectArticles: React.FC<MusicProps> = (props) => {
  const router = useRouter();

  const [musics, setMusics] = useState<Music[]>([]);
  const [music, setMusic] = useState<Music>(Object.create(null));
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [reload, setReload] = useState<number>();

  const columns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <a
          onClick={() => {
            setMusic(musics.find((it) => it.id == id));
            setIsShowUpdateModal(true);
          }}
        >
          {id}
        </a>
      ),
    },
    { title: "歌名", dataIndex: "name", key: "name" },
    { title: "专辑", dataIndex: "artist", key: "artist" },
    {
      title: "链接",
      dataIndex: "url",
      key: "url",
      render: (url: string) => <div>{url ? "白嫖 CDN" : "阿里 OSS"}</div>,
    },
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover: string) => <div>{cover ? "白嫖 CDN" : "阿里 OSS"}</div>,
    },
    {
      title: "歌词",
      dataIndex: "lrc",
      key: "lrc",
      render: (lrc: string) => <div>{lrc ? "白嫖 CDN" : "阿里 OSS"}</div>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <Switch checked={status} />,
    },
    { title: "播放次数", dataIndex: "score", key: "score" },
  ];

  useEffect(() => {
    (async () => {
      setMusics(await useHttpGet(`${Host4NodeJS}/music/selectMusics`));
    })();
    return () => {};
  }, [reload]);

  /**
   * Music 更新
   * @param key
   * @param value
   */
  const useMusicChanged = (key: keyof Music | string, value: any) => {
    let _music = Object.assign({}, music);
    _music[key] = value;
    setMusic(_music);
  };

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
            setMusic(Object.create(null));
            setIsShowUpdateModal(true);
          }}
        >
          新建歌曲
        </Button>
      </div>
      <div style={{ height: 16 }} />
      <Table
        dataSource={musics}
        columns={columns}
        bordered={true}
        size="small"
        rowKey={(music) => music.id}
      />
      <Modal
        visible={isShowUpdateModal}
        title={music.name}
        onOk={async () => {
          let _music = Object.assign({}, music, {
            id: music.id ?? useUUID(),
            score: music.score ?? 0,
          });
          await useHttpPost(
            `${Host4NodeJS}/music/updateMusic`,
            JSON.stringify(_music)
          );
          setReload(Math.random());
          setIsShowUpdateModal(false);
        }}
        onCancel={() => {
          setIsShowUpdateModal(false);
        }}
      >
        <FormItem title="歌名">
          <Input
            placeholder="请输入歌名"
            value={music.name}
            onChange={(e) => {
              useMusicChanged("name", e.target.value);
            }}
          />
        </FormItem>

        <FormItem title="歌手">
          <Input
            value={music.artist}
            placeholder="请输入歌手"
            onChange={(e) => {
              useMusicChanged("artist", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="MP3 链接: 空则为 OSS -> ${id}.mp3">
          <Input
            value={music.url}
            placeholder="请输入链接"
            onChange={(e) => {
              useMusicChanged("url", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="封面: 空则为 OSS -> ${id}.jpg">
          <Input
            value={music.cover}
            placeholder="请输入封面"
            onChange={(e) => {
              useMusicChanged("cover", e.target.value);
            }}
          />
        </FormItem>
        <FormItem title="歌词: 空则为 OSS -> ${id}.lrc">
          <Input
            value={music.lrc}
            placeholder="请输入歌词"
            onChange={(e) => {
              useMusicChanged("lrc", e.target.value);
            }}
          />
          <FormItem title="状态">
            <Switch
              style={{ width: 32 }}
              checked={music.status}
              onChange={(checked) => {
                useMusicChanged("status", checked);
              }}
            />
          </FormItem>
        </FormItem>
      </Modal>
    </Frameweork>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default withRouter(SelectArticles);
