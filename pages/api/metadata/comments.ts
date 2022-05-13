import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../models/PGdb'

type Data = {
  message: string
  post: any
  metadata?: any
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
    const {post_id, user_id, body} = req.body;
    const query = 'INSERT INTO comments (post_id, user_id, body, created_on) VALUES ($1, $2, $3, $4, $5)';
    const vals = []

    const data = await db.query(query, ['hi', 'there']);
  } else if (req.method === 'GET') {
    const query = 'SELECT * FROM comments';
    const data = await db.query(query);
    res.status(200).json(data)
  }
}


// 0: {name: 'comment_id' }
// 1: {name: 'post_id' }
// 2: {name: 'user_id' }
// 3: {name: 'body' }
// 4: {name: 'created_on' }