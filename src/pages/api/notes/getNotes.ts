import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });

    const notes = await prisma.note.findMany({
      where: { userId: user?.id },
    });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
