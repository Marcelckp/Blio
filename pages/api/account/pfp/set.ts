import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../models/PGdb'
const cloudinary = require('cloudinary').v2

type Data = {
  message: string
  user: any
}

type Error = {
  message: string
}

type ErrorReq = {
  message: any
  error: boolean
  errorMsg: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | ErrorReq>
) {
  if (req.method === 'PUT') {
    const { id, photo } = req.body

    const query =
      'UPDATE accounts SET profile_picture = $1 WHERE user_id = $2 RETURNING *'

    let data

    try {
      data = await cloudinary.uploader.upload(photo)
      const value = [data.url, id]
      try {
        if (data) {
          const user = await db.query(query, value)
          res
            .status(201)
            .json({ message: 'Successfully set profile picture', user: user.rows[0] })
        } else {
          return res.status(400).json({
            message: 'Photo data was to big to create a post',
            error: true,
            errorMsg: 'Photo data was to big to create a post',
          })
        }
      } catch (e) {
        console.log(e)
        res.status(400).json({ error: true, errorMsg: e, message: e })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ error: true, errorMsg: e, message: e })
    }
  }
}
