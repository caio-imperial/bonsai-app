import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File as FormidableFile } from "formidable";
import { createEntry } from "@/lib/data";
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
  if (req.method === "POST") {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // opcional: 5MB
    });

    form.parse(req, async (err, fields, files: Files) => {
      if (err) {
        console.error("Erro no form:", err);
        return res.status(500).json({ error: "Erro ao processar o upload" });
      }

      const bonsaiId = req.query.bonsaiId?.toString() || "";
      const note = fields.note?.toString() || "";
      const dateEntry =
        fields.dateEntry?.toString() || new Date().toISOString();

      const image = files.image as File | undefined;
      if (!image || (Array.isArray(image) && image.length === 0)) {
        return res.status(400).json({ error: "Imagem inválida" });
      }

      const fileToUpload = Array.isArray(image) ? image[0] : image;

      const imageUrl = await uploadToImgBB(fileToUpload);

      await createEntry(bonsaiId, imageUrl, note, dateEntry);

      return res.status(200).json({ ok: true });
    });
  }
}
