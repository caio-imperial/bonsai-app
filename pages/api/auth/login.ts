import { serialize } from 'cookie'
import { SignJWT } from 'jose'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required.' })
  }

  if (
    username === process.env.AUTH_USER &&
    password === process.env.AUTH_PASS
  ) {
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || ''))

    const cookie = serialize('auth', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ message: 'Login successful!' })
  }

  return res.status(401).json({ error: 'Invalid credentials.' })
}
