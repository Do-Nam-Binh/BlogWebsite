export interface Post {
  _id: string;
  title: string;
  summary: string;
  content: string;
  categories: Array<string>;
  tags: Array<string>;
  visibility: boolean;
  likes: number;
  reactions: Map<string, number>;
  postedDate: Date;
}
