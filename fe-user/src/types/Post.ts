import { Emoji } from "./Emoji";

export interface Post {
  _id: string;
  title: string;
  summary: string;
  content: string;
  categories: Array<string>;
  tags: Array<string>;
  visibility: boolean;
  likes: number;
  reactions: Map<Emoji, number>;
  createdAt: string;
  updatedAt: string;
}

export type PostState = {
  title: string;
  summary: string;
  content: string;
  categories: string[];
  tags: string[];
};

export type PostAction =
  | { type: "TITLE"; value: string }
  | { type: "SUMMARY"; value: string }
  | { type: "CONTENT"; value: string }
  | { type: "ADD_CATEGORY"; value: string }
  | { type: "REMOVE_CATEGORY"; value: string }
  | { type: "ADD_TAG"; value: string }
  | { type: "REMOVE_TAG"; value: string };
