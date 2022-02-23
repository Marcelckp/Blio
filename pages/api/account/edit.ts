import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string
}

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
    response.status(200).json({ message : 'Welcome to the edit router'})
}