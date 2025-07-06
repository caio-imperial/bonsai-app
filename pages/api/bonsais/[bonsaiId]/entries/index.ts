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
      maxFileSize: 32 * 1024 * 1024, // 32MB
    });
    const bonsaiId = req.query.bonsaiId?.toString() || "";

    form.parse(req, async (err, fields, files: Files) => {
      const dateEntry = fields.dateEntry?.toString() || null;
      if (!dateEntry) {
        return res.status(422).json({ 
          error: "Atributo dateEntry e obrigatório",
          message: "Para registrar um registro, é necessário informar a data de registro",
        });
      }
  
      const title = fields.title?.toString() || null;
      if (!title) {
        return res.status(422).json({ 
          error: "Atributo title e obrigatório",
          message: "Para registrar um registro, é necessário informar o título",
        });
      }

      if (err) {
        return res.status(500).json({ 
          error: "Erro no form:", err,
          message: "Erro ao processar o upload da imagem",
        });
      }

      const notes = fields.notes?.toString() || "";

      const image = files.image as File | undefined;
      if (!image || (Array.isArray(image) && image.length === 0)) {
        return res.status(400).json({ error: "Imagem inválida", message: "Para registrar um registro, é necessário informar uma imagem" });
      }

      const fileToUpload = Array.isArray(image) ? image[0] : image;

      const imageUrl = await uploadToImgBB(fileToUpload);

      await createEntry({
        bonsaiId,
        imageUrl,
        title,
        notes,
        dateEntry,
      });

      return res.status(200).json({ ok: true });
    });
  }
}
