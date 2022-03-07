import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../models/PGdb'
import bcrypt from 'bcrypt'
import Cookie from 'js-cookie'

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

// Login

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorReq | Error>
) {
  console.log(req.cookies)
  if (req.method === 'POST') {
    const { username, email, password } = req.body

    if (username) {
      const query = 'SELECT * FROM accounts WHERE username = $1'
      const values = [username]

      try {
        const account = await db.query(query, values)

        if (account.rows.length > 0) {
          try {
            const hashCompare = await bcrypt.compare(
              password,
              account.rows[0].password
            )

            if (hashCompare) {
              Cookie.set('user', account.rows[0])
              res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(account.rows[0]), { httpOnly: false, path: '/' }))
              return res.status(200).json({
                message: 'User successfully authenticated',
                account: account.rows[0],
              })
            } else {
              return res.status(401).json({
                message: 'Username, email or password are incorrect',
                error: true,
                errorMsg: 'Username, email or password are incorrect',
              })
            }
          } catch (err) {
            console.log(err)
          }
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
    } else if (email) {
      const query = 'SELECT * FROM accounts WHERE email = $1'
      const values = [email]

      try {
        const account = await db.query(query, values)

        if (account.rows.length > 0) {
          try {
            const hashCompare = await bcrypt.compare(
              password,
              account.rows[0].password
            )

            if (hashCompare) {
              Cookie.set('user', account.rows[0])
              return res.status(200).json({
                message: 'User successfully authenticated',
                account: account.rows[0],
              })
            } else {
              return res.status(401).json({
                message: 'Username, email or password are incorrect',
                error: true,
                errorMsg: 'Username, email or password are incorrect',
              })
            }
          } catch (err) {
            console.log(err)
          }
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
    } else if ( (!username || !email) && !password) {
      return res.status(400).json({message: 'Error signing user in since no credentials were provided', errorMsg: 'Please provide a username & password to sign in'})
    }
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
