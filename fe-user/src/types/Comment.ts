export interface Comment {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    username: string;
  };
  replyId: string;
  content: string;
  edited: boolean;
  deleted: boolean;
  children?: Comment[];
}

export type CommentState = {
  postId: string;
  replyId: string;
  content: string;
};

export interface PostComment {
  postId: string;
  comments: Comment[];
}
