import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../models/PGdb'
import bcrypt from 'bcrypt'

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
  res: NextApiResponse<Data | Error | ErrorReq>
) {
  if (req.method === 'POST') {
    const { fullname, email, password, username } = req.body

    if (fullname && email && password && username) {
      const query = `INSERT INTO accounts (fullname, email, password, username, last_login, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

      const hash = await bcrypt.hash(password, 10)

      const values = [
        fullname,
        email,
        hash,
        username,
        null,
        Date.now().toLocaleString(),
      ]

      try {
        const account = await db.query(query, values)
        return res
          .status(200)
          .json({ message: 'Account successfully created', account })
      } catch (err) {
        return res
          .status(400)
          .json({
            message: 'Error creating account',
            error: true,
            errorMsg: err,
          })
      }
    } else {
      return res.status(400).json({ message: 'Error creating a new account since there are credentials missing', errorMsg: 'All information is required before creating a new account, please check your form submission', error: true })
    }
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
