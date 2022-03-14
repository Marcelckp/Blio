import type { NextApiRequest, NextApiResponse } from 'next'
const cloudinary = require('cloudinary').v2
import { db } from '../../../models/PGdb'

type Data = {
  message: string
  post: any
}

type Error = {
  message: string
}

type ErrorReq = {
  message: string
  error: boolean
  errorMsg: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | ErrorReq>
) {
  if (req.method === 'POST') {
    const { title, body, photo } = req.body
    // console.log(req.cookies, JSON.parse(req.cookies.user))

    if (title && body && photo) {
      const query = `INSERT INTO posts (user_id, title, body, blur, photo, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

      //   console.log(cloudinary.config());
      let data 

      try {
        data = await cloudinary.uploader.upload(photo)
      } catch (e) {
        console.log(e)
      }

      console.log(data, data.url)
      try {
        if (data) {
          const values = [
            JSON.parse(req.cookies.user).user_id,
            title,
            body,
            body.slice(0, 155),
            data?.url,
            Date.now().toLocaleString(),
          ]

          const post = await db.query(query, values)
          console.log(post.rows)
          return res
            .status(200)
            .json({ message: 'Post successfully created', post: post.rows[0] })
        } else {
          return res.status(400).json({ message: 'Photo data was to big to create a post', error:true, errorMsg: 'Photo data was to big to create a post' });
        }
      } catch (err) {
        console.log(err)
        return res.status(400).json({
          message: 'Error creating post',
          error: true,
          errorMsg: err,
        })
      }
    } else {
      return res.status(400).json({
        message:
          'Error creating a new post since there are data points missing',
        errorMsg:
          'All information is required before creating a new post, please check your form submission',
        error: true,
      })
    }
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
