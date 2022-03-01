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
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const query = 'DELETE FROM posts WHERE post_id = $1'

    const values = [req.body.id]
    try {
      await db.query(query, values)
      return res.status(200).json({ message: 'Successfully deleted post' })
    } catch (e) {
      return res.status(404).json({
        message: 'The post you want to delete could not be found',
        error: true,
        errorMsg: 'The post you want to delete could not be found',
      })
    }
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
