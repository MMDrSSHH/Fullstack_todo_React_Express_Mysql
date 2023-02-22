import express from "express";
import { getDate, validate } from "../../../helpers/functions";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const errors = validate(req.body, "signin");

    if (Object.keys(errors).length) {
      throw { message: "fields", fieldErrors: errors };
    }

    let user;

    user = await prisma.users.findUnique({
      where: { username: req.body.username },
    });
    if (user) {
      throw { message: "username already exists" };
    }

    user = await prisma.users.findUnique({ where: { email: req.body.email } });
    if (user) {
      throw { message: "email already exists" };
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = { ...req.body, password: hashedPassword };

    user = await prisma.users.create({ data });

    if (!process.env.JWT_SECRET) {
      throw { message: "cannot read secret" };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, { expires: getDate(7), secure: true })
      .json({ signin: true });
  } catch (error) {
    res.json({ signin: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const errors = validate(req.body, "login");

    if (Object.keys(errors).length) {
      throw { message: "fields", fieldErrors: errors };
    }

    let user = await prisma.users.findUnique({
      where: { username: req.body.username },
    });

    if (!user) {
      throw { message: "invalid credentials" };
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      throw { message: "invalid credentials" };
    }

    if (!process.env.JWT_SECRET) {
      throw { message: "cannot read secret" };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { expires: getDate(7) }).json({ login: true });
  } catch (error) {
    res.json({ login: false, error });
  }
});

export default router;
