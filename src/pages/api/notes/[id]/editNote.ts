import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return;
  }
  const updatedNote = req.body;
  try {
    const note = await prisma.note.update({
      where: { id: req.query.id },
      data: {
        title: updatedNote.title,
        content: updatedNote.content,
      },
    });

    res.status(200).json({ message: "Edited Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
