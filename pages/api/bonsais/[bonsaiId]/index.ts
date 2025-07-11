import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteBonsai, getEntries, updateBonsai } from '@/lib/data'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.bonsaiId as string

    const client = await clientPromise
    const db = client.db('bonsais')
    const bonsai = await db.collection('bonsais').findOne({ _id: new ObjectId(id) })

    if (!bonsai) return res.status(404).json({ error: 'Bonsai Id não encontrado', message: 'Bonsai não encontrado' })

    res.status(200).json(bonsai)
  }
  else if (req.method === 'PATCH') {
    const { bonsaiId } = req.query
    const { name, species, favorite } = req.body

    try {
      await updateBonsai(bonsaiId as string, { name, species, favorite })
      res.status(204).end()
    } catch {
      res.status(400).json({ error: 'Erro inesperado', message: "Falha ao atualizar bonsai" })
    }
  } else if (req.method === 'DELETE') {
    const id = req.query.bonsaiId as string
    await deleteBonsai(id)
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}
