// lib/data.ts
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// 🪴 Buscar todos os bonsais
export async function getBonsais() {
  const client = await clientPromise
  const db = client.db('bonsais')
  const bonsais = await db.collection('bonsais').find().sort({ createdAt: -1 }).toArray()
  return bonsais
}

// 🪴 Criar um novo bonsai
export async function createBonsai(name: string, species?: string) {
  const client = await clientPromise
  const db = client.db('bonsais')
  const newBonsai = {
    name,
    species: species || '',
    createdAt: new Date(),
  }
  const result = await db.collection('bonsais').insertOne(newBonsai)
  return result.insertedId
}

// 📸 Buscar registros de um bonsai
export async function getEntries(bonsaiId: string) {
  const client = await clientPromise
  const db = client.db('bonsais')
  const entries = await db
    .collection('entries')
    .find({ bonsaiId: new ObjectId(bonsaiId) })
    .sort({ createdAt: -1 })
    .toArray()
  return entries
}

// 📸 Criar novo registro com imagem
export async function createEntry(
  bonsaiId: string,
  imageUrl: string,
  notes: string,
  dateEntry: string
) {
  const client = await clientPromise
  const db = client.db('bonsais')
  const newEntry = {
    bonsaiId: new ObjectId(bonsaiId),
    imageUrl,
    notes,
    dateEntry: new Date(dateEntry),
    createdAt: new Date(),
  }
  const result = await db.collection('entries').insertOne(newEntry)
  return result.insertedId
}

export async function deleteBonsai(id: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db('bonsais');
  const bonsai = await db.collection('bonsais').findOne({ _id: new ObjectId(id) })
  if (!bonsai) {
    throw new Error('Bonsai não encontrado')
  }
  const entries = await getEntries(id)
  for (const entry of entries) {
    await db.collection('entries').deleteOne({ _id: new ObjectId(entry._id) })
  }
  await db.collection('bonsais').deleteOne({ _id: new ObjectId(id) });
}
