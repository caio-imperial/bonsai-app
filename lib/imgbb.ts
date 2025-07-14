// lib/imgbb.ts
import fs from 'node:fs/promises'
import type { UploadedFile } from '@/lib/types'

export async function uploadToImgBB(file: UploadedFile): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) throw new Error('IMGBB_API_KEY não definida no .env')

  if (!file || !file.filepath) {
    throw new Error('File is not defined or filepath is missing')
  }

  const buffer = await fs.readFile(file.filepath)
  const base64 = buffer.toString('base64')

  const form = new URLSearchParams()
  form.append('image', base64)

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: form,
  })

  const data = await res.json()
  return data.data.url as string
}
