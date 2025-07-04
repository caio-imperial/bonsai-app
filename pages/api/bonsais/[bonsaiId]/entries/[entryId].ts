import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File as FormidableFile } from "formidable";
import { deleteEntry, updateEntry } from "@/lib/data";
import { uploadToImgBB } from "@/lib/imgbb";

// Desativa o bodyParser padrão do Next pra aceitar multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

interface Files {
  image?: FormidableFile | FormidableFile[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return;
  } else if (req.method === "DELETE") {
    const entryId = req.query.entryId?.toString() || "";
    await deleteEntry(entryId);
    return res.status(204).end();
  }  else if (req.method === "PATCH") {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // opcional: 5MB
    });

    form.parse(req, async (err, fields, files: Files) => {
      if (err) {
        console.error("Erro no form:", err);
        return res.status(500).json({ error: "Erro ao processar o upload" });
      }
    
      const entryId = req.query.id?.toString() || "";
      const notes = fields.notes?.toString() || "";
      const dateEntry = fields.dateEntry?.toString() || new Date().toISOString();
    
      const image = files.image as File | undefined;
      let imageUrl;
    
      if (image && (Array.isArray(image) && image.length > 0)) {
        const fileToUpload = Array.isArray(image) ? image[0] : image;
        imageUrl = await uploadToImgBB(fileToUpload);
      }
    
      // Chama a função de atualização, passando os campos opcionais
      await updateEntry({
        _id: entryId,
        imageUrl,
        notes: notes,
        dateEntry,
      });
    
      return res.status(200).json({ ok: true });
    });
  }
}
