import type { NextApiRequest, NextApiResponse } from 'next'
import { getRegistros } from '@/lib/data'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  const client = await clientPromise
  const db = client.db('bonsais')
  const bonsai = await db.collection('bonsais').findOne({ _id: new ObjectId(id) })

  if (!bonsai) return res.status(404).json({ error: 'Bonsai não encontrado' })

  const registros = await getRegistros(id)

  res.status(200).json({ bonsai, registros })
}
