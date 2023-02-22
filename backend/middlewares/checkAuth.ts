import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export default async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw { message: "no token" };
    } else if (process.env.JWT_SECRET) {
      const decodedToken = <any>jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.users.findUnique({
        where: { id: decodedToken.id },
      });

      if (!user) {
        throw { message: "user not found" };
      }

      req.body = { ...req.body, user };
    }

    next();
  } catch (error: any) {
    res.json({ error });
  }
}
