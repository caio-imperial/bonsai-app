// lib/data.ts
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// 🪴 Buscar todos os bonsais
export async function getBonsais() {
  const client = await clientPromise
  const db = client.db('bonsais')
  const bonsais = await db.collection('bonsais').find().sort({ criadoEm: -1 }).toArray()
  return bonsais
}

// 🪴 Criar um novo bonsai
export async function createBonsai(nome: string, especie?: string) {
  const client = await clientPromise
  const db = client.db('bonsais')
  const novo = {
    nome,
    especie: especie || '',
    criadoEm: new Date(),
  }
  const result = await db.collection('bonsais').insertOne(novo)
  return result.insertedId
}

// 📸 Buscar registros de um bonsai
export async function getRegistros(bonsaiId: string) {
  const client = await clientPromise
  const db = client.db('bonsais')
  const registros = await db
    .collection('registries')
    .find({ bonsaiId: new ObjectId(bonsaiId) })
    .sort({ data: -1 })
    .toArray()
  return registros
}

// 📸 Criar novo registro com imagem
export async function createRegistro(
  bonsaiId: string,
  imagemUrl: string,
  nota: string,
  data: string
) {
  const client = await clientPromise
  const db = client.db('bonsais')
  const novo = {
    bonsaiId: new ObjectId(bonsaiId),
    imagemUrl,
    nota,
    data: new Date(data),
    criadoEm: new Date(),
  }
  const result = await db.collection('registries').insertOne(novo)
  return result.insertedId
}
