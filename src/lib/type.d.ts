import type { ObjectId } from "mongodb";

export interface iPost {
  user: any | null;
  group: string | RouteParams;
  date: Date;
  title: string;
  body: string;
  img?: string;
  _id?: ObjectId;
}
export interface Reply {
  postId: string;
  user: any | null;
  date: Date;
  content: string;
  group: string | RouteParams;
}
export interface iChat {
  // _id: string;
  user: any;
  chat: string;
  date: Date;
  group: string | RouteParams;
}

export interface iUser {
  name: string;
  uid: string;
  group: String;
}

export interface iGroup {
  name: string;
  _id: ObjectId;
}
