import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../models/PGdb'

type Data = {
  message: string
  account: any
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
  res: NextApiResponse<Data | ErrorReq | Error>
) {
  if (req.method === 'POST') {
    const { data: { id: { user } } } = req.body
    const query = 'SELECT * FROM accounts WHERE user_id = $1'
    const values = [+user]

    try {
      const account = await db.query(query, values)
      if (account.rows.length > 0) {
        return res.status(200).json({
          message: 'Account retrieved successfully',
          account: account.rows[0],
        })
      } else {
        return res.status(404).json({
          message: 'Account was not found',
          error: true,
          errorMsg: 'Account was not found',
        })
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Error finding account',
        error: true,
        errorMsg: err,
      })
    }
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
