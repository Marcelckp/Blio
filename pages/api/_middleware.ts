import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export default function middleware(req: NextApiRequest, res: NextApiResponse) {
    return NextResponse.next()
    // NextResponse.redirect('/login)
}