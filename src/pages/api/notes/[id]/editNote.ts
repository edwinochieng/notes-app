import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(60, { message: "Title should not exceed 60 characters" }),
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(350, { message: "Content should not exceed 350 characters" }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return;
  }
  const { data } = req.body;

  await formSchema.parse(data);

  try {
    const note = await prisma.note.update({
      where: { id: req.query.id },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    res.status(200).json({ message: "Edited Successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}
