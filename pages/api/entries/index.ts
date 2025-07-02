import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File as FormidableFile } from 'formidable'
import fs from 'fs'
import path from 'path'
import { createEntry } from '@/lib/data'
import { uploadToImgBB } from '@/lib/imgbb'

// Desativa o bodyParser padrão do Next pra aceitar multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
}

interface Files {
  image?: FormidableFile | FormidableFile[];
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
    const note = fields.note?.toString() || ''
    const dateEntry = fields.dateEntry?.toString() || new Date().toISOString()

    const image = files.image as File | undefined
    if (!image || (Array.isArray(image) && image.length === 0)) {
      return res.status(400).json({ error: 'Imagem inválida' })
    }

    const fileToUpload = Array.isArray(image) ? image[0] : image;

const imageUrl = await uploadToImgBB(fileToUpload);

    await createEntry(bonsaiId, imageUrl, note, dateEntry)

    return res.status(200).json({ ok: true })
  })
}
