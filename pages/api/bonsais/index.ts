// pages/api/novo-bonsai.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createBonsai, getBonsais } from '@/lib/data'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, especie } = req.body
    const id = await createBonsai(nome, especie)
    res.status(200).json({ id })
  } else if (req.method === 'GET') {
    const bonsais = await getBonsais()
    res.status(200).json(bonsais)
  } else {
    res.status(405).end()
  }
}
