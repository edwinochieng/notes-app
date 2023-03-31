import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return;
  }
  const noteId = req.body;
  try {
    const note = await prisma.note.delete({
      where: { id: noteId },
    });

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
