import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File as FormidableFile } from "formidable";
import { deleteEntry, getEntry, updateEntry } from "@/lib/data";
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
    const entryId = req.query.entryId?.toString() || "";
    const entry = await getEntry(entryId);
    return res.status(200).json({ entry });
  } else if (req.method === "DELETE") {
    const entryId = req.query.entryId?.toString() || "";
    await deleteEntry(entryId);
    return res.status(204).end();
  } else if (req.method === "PATCH") {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 32 * 1024 * 1024, // 32MB
    });

    form.parse(req, async (err, fields, files: Files) => {
      if (err) {
        console.error("Erro no form:", err);
        return res.status(500).json({ error: "Erro inesperado", message: "Falha ao processar o upload" });
      }

      const entryId = req.query.entryId?.toString() || "";
      const notes = fields.notes?.toString() || "";
      const title = fields.title?.toString() || "";
      const dateEntry = fields.dateEntry?.toString() || new Date().toISOString();

      const image = files.image as File | undefined;
      let imageUrl;

      if (image && (Array.isArray(image) && image.length > 0)) {
        const fileToUpload = Array.isArray(image) ? image[0] : image;
        imageUrl = await uploadToImgBB(fileToUpload);
      }

      // Chama a função de atualização, passando os campos opcionais
      try {
        await updateEntry({
          _id: entryId,
          imageUrl,
          title,
          notes,
          dateEntry,
        });
        return res.status(200).json({ ok: true });
      } catch {
        return res.status(400).json({ error: 'Erro inesperado', message: 'Falha ao atualizar entrada' });
      }
    });
  }
}
