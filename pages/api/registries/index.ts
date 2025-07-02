// pages/api/novo-registro.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File as FormidableFile } from 'formidable'
import fs from 'fs'
import path from 'path'
import { createRegistro } from '@/lib/data'

// Desativa o bodyParser padrão do Next pra aceitar multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
}

interface Files {
  imagem?: FormidableFile | FormidableFile[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const uploadDir = path.join(process.cwd(), 'public/uploads')

  // Cria a pasta se ainda não existir
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // opcional: 5MB
  })

  form.parse(req, async (err, fields, files: Files) => {
    if (err) {
      console.error('Erro no form:', err)
      return res.status(500).json({ error: 'Erro ao processar o upload' })
    }

    const bonsaiId = fields.bonsaiId?.toString() || ''
    const nota = fields.nota?.toString() || ''
    const data = fields.data?.toString() || new Date().toISOString()

    const imagem = files.imagem
    if (!imagem || (Array.isArray(imagem) && imagem.length === 0)) {
      return res.status(400).json({ error: 'Imagem inválida' })
    }

    const filename = path.basename(Array.isArray(imagem) ? imagem[0].filepath : imagem.filepath)
    const imageUrl = filename

    await createRegistro(bonsaiId, imageUrl, nota, data)

    return res.status(200).json({ ok: true })
  })
}
