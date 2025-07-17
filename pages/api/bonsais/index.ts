// pages/api/novo-bonsai.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createBonsai, getBonsais, getBonsaisCount } from '@/lib/data'

function validateBonsaiInput(name: string) {
  if (!name) {
    return {
      error: 'Atributo name é obrigatório',
      message: 'Para registrar um bonsai, é necessário informar o nome',
    }
  }
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { name, species, favorite } = req.body
      const validationError = validateBonsaiInput(name)
      if (validationError) {
        return res.status(422).json(validationError)
      }
      const id = await createBonsai({
        name,
        species,
        favorite: favorite || false,
      })
      return res.status(200).json({ id })
    } else if (req.method === 'GET') {
      const search = (req.query.search as string) || ''
      const page = Number(req.query.page || 1)
      const limit = Number(req.query.limit || 10)

      const total = await getBonsaisCount({ search })
      const bonsais = await getBonsais({ page, limit, search })
      const totalPages = Math.ceil(total / limit)
      const nextPage = page < totalPages ? page + 1 : null
      const previousPage = page > 1 ? page - 1 : null

      return res.status(200).json({
        data: bonsais,
        meta: {
          total,
          page,
          limit,
          totalPages,
          nextPage,
          previousPage,
        },
      })
    } else {
      return res.status(405).end()
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
