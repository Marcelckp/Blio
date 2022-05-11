import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../models/PGdb'

type Data = {
  message: string
  posts: any
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
    const {
      data: { cookie },
    } = req.body
    const query =
      'SELECT * FROM posts INNER JOIN accounts USING(user_id) WHERE user_id = $1'
    const value = [+cookie.id || JSON.parse(cookie.user || '').user_id]
    let response
    try {
      response = await db.query(query, value)
    } catch (err) {
      return res
        .status(404)
        .json({ error: true, message: 'The users was not found' })
    }
    return res
      .status(200)
      .json({ posts: response.rows, message: 'Successfully retrieved posts' })
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
