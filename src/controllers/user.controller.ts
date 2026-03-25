import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const user = await prisma.user.create({
    data: { email, name },
  });

  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
