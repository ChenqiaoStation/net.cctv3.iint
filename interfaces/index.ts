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
  status: number;
  score: number;
  createTime: string;
  updateTime?: string;
  likeCount?: number;
  lookCount?: number;
  discusses?: any[] | number;
}
