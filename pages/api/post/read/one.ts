import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../models/PGdb'

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
  const { id } = req.query
  if (req.method === 'GET') {
    const query = 'SELECT * FROM posts INNER JOIN accounts USING(user_id) WHERE post_id = $1'
    const data = await db.query(query, [id])
    return res
      .status(200)
      .json({ post: data.rows, message: 'Successfully retrieved posts' })
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
