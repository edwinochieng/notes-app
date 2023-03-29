import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../../prisma/client";

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

    const newNote = await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        userId: user?.id!,
      },
    });

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
