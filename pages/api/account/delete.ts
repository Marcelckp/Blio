import type { NextApiRequest, NextApiResponse } from 'next'

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | ErrorReq>
) {
  if (req.method === 'DELETE') {
    res.status(200).json({ message: 'Welcome to the delete router' })
  } else {
    return res.status(404).json({ message: 'Route was not found' })
  }
}
