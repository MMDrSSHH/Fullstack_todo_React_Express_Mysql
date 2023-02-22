import express from "express";
import checkAuth from "../../../middlewares/checkAuth";
import prisma from "../../../lib/prisma";
import { users as User } from "@prisma/client";

const router = express.Router();

// Return the list of all users for an admin
// except the admin itself
router.get("/", checkAuth, async (req, res) => {
  try {
    const user: User = req.body.user;
    if (user && user.role === "admin") {
      const users = await prisma.users.findMany({
        where: { id: { not: user.id } },
      });

      res.json(users);
    } else if (!user) {
      throw { message: "no user" };
    } else {
      throw { message: "not authorized" };
    }
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// Return the logged in user's data
router.get("/user", checkAuth, async (req, res) => {
  try {
    const user: User = req.body.user;
    res.json(user);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

export default router;
