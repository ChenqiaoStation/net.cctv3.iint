// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface Article {
  id: string;
  slug: string;
  images: [];
  tags: string[];
  title: string;
  message: string;
  password?: string;
  status: boolean;
  independent: boolean; // 是否独立页面
  score: number;
  createTime: string;
  updateTime?: string;
  likeCount?: number;
  lookCount?: number;
  discussCount: number;
}

export interface Picture {
  id: string;
  file: string;
  title: string;
  message: string;
  status: boolean;
  createTime: string;
  updateTime: string;
}
export interface Album {
  id: string;
  file: string;
  title: string;
  message: string;
  status: boolean;
  isGroup: boolean;
  password: string;
  score: number;
  createTime: string;
  updateTime: string;
  children: number | Picture[];
}

export interface OSSTarget {
  project: "net.cctv3.next";
  target: "cover" | "article" | "album" | "config" | "picture";
  file: string;
}

export interface Discuss {
  id: string;
  parent?: string;
  title: string;
  message: string;
  status: boolean;
  email: string;
  IP: string;
  agent: string;
  address: string;
  time: string;
  children: Discuss[];
}

export interface Music {
  id: string;
  name: string; // 我从草原来
  artist: string; // 凤凰传奇
  url: string;
  cover: string;
  lrc: string;
  status: boolean;
  score: number;
}
