export interface Post {
  photo: string
  body: string
  title: string
  body: string
  blur: string
  post_id: number
  user_id: number
  created_on: string
}

export interface InnerJoinPost {
  photo: string
  body: string
  title: string
  body: string
  blur: string
  post_id: number
  user_id: number
  created_on: string
  fullname: string
  username: string
  last_login: string
  password: string
}