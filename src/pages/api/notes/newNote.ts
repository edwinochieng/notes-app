import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../../prisma/client";
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
  if (req.method !== "POST") {
    return;
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(400).json({ message: "Sign in required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user.email },
    });

    const { note } = req.body;

    await formSchema.parse(note);

    const newNote = await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        userId: user?.id!,
      },
    });

    res.status(201).json(newNote);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}
