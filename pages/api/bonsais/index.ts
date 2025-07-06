// pages/api/novo-bonsai.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createBonsai, getBonsais } from '@/lib/data'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, species } = req.body
    if (!name) {
      return res.status(422).json({ 
        error: "Atributo name e obrigatório",
        message: "Para registrar um bonsai, é necessário informar o nome",
      });
    }
    const id = await createBonsai({ name, species })
    res.status(200).json({ id })
  } else if (req.method === 'GET') {
    const bonsais = await getBonsais()
    res.status(200).json(bonsais)
  } else {
    res.status(405).end()
  }
}
