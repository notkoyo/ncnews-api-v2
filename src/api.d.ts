interface EndpointParams {
  method: string,
  route: string,
  description: string,
}

export interface Endpoints {
  [key: string]: EndpointParams
}

export type Endpoint = {
  endpoint: string;
  method: string;
  description: string;
};

export type Articles = {
  article_id: number,
  title: string,
  topic: string,
  author: string,
  body: string,
  created_at: string,
  votes: number,
  article_img_url: string,
}

export type Comments = {
  comment_id: number,
  body: string,
  article_id: number,
  author: string,
  votes: number,
  created_at: string,
}

export type Users = {
  username: string,
  first_name: string,
  last_name: string,
  avatar_url: string,
}

export type Topics = {
  slug: string,
  description: string,
}