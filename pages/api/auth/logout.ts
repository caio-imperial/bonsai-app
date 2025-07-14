import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('auth', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
  })

  res.setHeader('Set-Cookie', cookie)
  res.status(302).redirect('/login')
}
