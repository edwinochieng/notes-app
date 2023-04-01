import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return;
  }
  const { data } = req.body;

  console.log(data);

  try {
    const note = await prisma.note.update({
      where: { id: req.query.id },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    res.status(200).json({ message: "Edited Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
