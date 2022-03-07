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
  if (req.method === 'GET') {
    const query = 'SELECT * FROM posts INNER JOIN accounts USING(user_id)'
    const data = await db.query(query)
    return res
      .status(200)
      .json({ posts: data.rows, message: 'Successfully retrieved posts' })
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
