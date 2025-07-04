// lib/data.ts
import clientPromise from "@/lib/mongodb";
import { Bonsai, Entry } from "@/types";
import { ObjectId } from "mongodb";

// 🪴 Buscar todos os bonsais
export async function getBonsais() {
  const client = await clientPromise;
  const db = client.db("bonsais");
  const bonsais = await db
    .collection("bonsais")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return bonsais;
}

// 🪴 Criar um novo bonsai
export async function createBonsai({
  name,
  species,
}: Omit<Bonsai, "_id" | "createdAt">) {
  const client = await clientPromise;
  const db = client.db("bonsais");
  const newBonsai = {
    name,
    species: species || "",
    createdAt: new Date(),
  };
  const result = await db.collection("bonsais").insertOne(newBonsai);
  return result.insertedId;
}

// 📸 Buscar registros de um bonsai
export async function getEntries(bonsaiId: string) {
  if (!bonsaiId) {
    throw new Error("ID do bonsai não informado");
  }
  if (!ObjectId.isValid(bonsaiId)) {
    throw new Error("ID do bonsai inválido");
  }
  const client = await clientPromise;
  const db = client.db("bonsais");
  const entries = await db
    .collection("entries")
    .find({ bonsaiId: new ObjectId(bonsaiId) })
    .sort({ dateEntry: -1 })
    .toArray();
  return entries;
}

// 📸 Buscar um registro de um bonsai
export async function getEntry(entryId: string) {
  if (!entryId) {
    throw new Error("ID do registro não informado");
  }
  if (!ObjectId.isValid(entryId)) {
    throw new Error("ID do registro inválido");
  }
  const client = await clientPromise;
  const db = client.db("bonsais");
  const entry = await db
    .collection("entries")
    .findOne({ _id: new ObjectId(entryId) });
  return entry;
}

// 📸 Criar novo registro com imagem
export async function createEntry({
  bonsaiId,
  imageUrl,
  notes,
  dateEntry,
}: Omit<Entry, "_id" | "createdAt">) {
  const client = await clientPromise;
  const db = client.db("bonsais");
  const newEntry = {
    bonsaiId: new ObjectId(bonsaiId),
    imageUrl,
    notes,
    dateEntry: new Date(dateEntry),
    createdAt: new Date(),
  };
  const result = await db.collection("entries").insertOne(newEntry);
  return result.insertedId;
}

// 📸 Atualizar um bonsai
export async function updateBonsai(
  bonsaiId: string,
  { name, species }: Partial<Bonsai>
) {
  const client = await clientPromise;
  const db = client.db("bonsais");
  await db
    .collection("bonsais")
    .updateOne({ _id: new ObjectId(bonsaiId) }, { $set: { name, species } });
}

// 📸 Atualizar um registro com imagem
export async function updateEntry({
  _id,
  imageUrl,
  notes,
  dateEntry,
}: Partial<Entry>) {
  if (!_id) {
    throw new Error("ID do registro não informado");
  }
  if (!ObjectId.isValid(_id)) {
    throw new Error("ID do registro inválido");
  }
  const client = await clientPromise;
  const db = client.db("bonsais");
  const entry = await db
    .collection("entries")
    .findOne({ _id: new ObjectId(_id) });
  if (!entry) {
    throw new Error("Registro não encontrado");
  }
  const updateData = {
    ...(imageUrl && { imageUrl }),
    ...(notes && { notes }),
    ...(dateEntry && { dateEntry: new Date(dateEntry) }),
  };
  await db
    .collection("entries")
    .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
}

// 📸 Deletar um registro com imagem
export async function deleteEntry(entryId: string): Promise<void> {
  if (!entryId) {
    throw new Error("ID do registro não informado");
  }
  if (!ObjectId.isValid(entryId)) {
    throw new Error("ID do registro inválido");
  }
  const client = await clientPromise;
  const db = client.db("bonsais");
  const entry = await db
    .collection("entries")
    .findOne({ _id: new ObjectId(entryId) });
  if (!entry) {
    throw new Error("Registro não encontrado");
  }
  await db.collection("entries").deleteOne({ _id: new ObjectId(entryId) });
}

// 🪴 Deletar um bonsai
export async function deleteBonsai(bonsaiId: string): Promise<void> {
  if (!bonsaiId) {
    throw new Error("ID do bonsai não informado");
  }
  if (!ObjectId.isValid(bonsaiId)) {
    throw new Error("ID do bonsai inválido");
  }
  const client = await clientPromise;
  const db = client.db("bonsais");
  const bonsai = await db
    .collection("bonsais")
    .findOne({ _id: new ObjectId(bonsaiId) });
  if (!bonsai) {
    throw new Error("Bonsai não encontrado");
  }
  const entries = await getEntries(bonsaiId);
  for (const entry of entries) {
    await db.collection("entries").deleteOne({ _id: new ObjectId(entry._id) });
  }
  await db.collection("bonsais").deleteOne({ _id: new ObjectId(bonsaiId) });
}
