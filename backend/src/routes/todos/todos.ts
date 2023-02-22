import express from "express";
import checkAuth from "../../../middlewares/checkAuth";
import prisma from "../../../lib/prisma";
import { users as User, todos as Todo } from "@prisma/client";

const router = express.Router();

router
  .route("/")

  .get(checkAuth, async (req, res) => {
    try {
      const user: User = req.body.user;
      if (user) {
        const todos = await prisma.todos.findMany({
          where: { user_id: user.id },
        });
        res.json(todos);
      } else {
        throw { message: "no user" };
      }
    } catch (error) {
      console.log(error);
      res.end();
    }
  })

  .post(checkAuth, async (req, res) => {
    try {
      const user: User = req.body.user;
      const newTodo: Todo = req.body.todo;

      console.log(req.body);

      if (newTodo && newTodo.todo) {
        const { todo: todoStr, completed } = newTodo;
        const todo = await prisma.todos.create({
          data: { user_id: user.id, todo: todoStr, completed },
        });

        res.json(todo);
      } else if (!newTodo) {
        throw { message: "no todo provided" };
      } else if (!user) {
        throw { message: "no user" };
      } else {
        throw { message: "no todo string provided" };
      }
    } catch (error) {
      console.log(error);
      res.end();
    }
  });

router
  .route("/:id")
  .get(checkAuth, async (req, res) => {
    try {
      const user: User = req.body.user;
      const { id: todoId } = req.params;
      const todo = await prisma.todos.findFirst({
        where: { id: Number(todoId), AND: { user_id: user.id } },
      });

      res.json(todo ? todo : {});
    } catch (error) {
      console.log(error);
      res.end();
    }
  })

  .delete(checkAuth, async (req, res) => {
    try {
      console.log("delete");
      const user: User = req.body.user;
      const { id: todoId } = req.params;

      const todo = await prisma.todos.findFirst({
        where: { id: Number(todoId) },
      });
      if (todo && user.id === todo.user_id) {
        const todo = await prisma.todos.delete({
          where: { id: Number(todoId) },
        });
        res.json(todo ? todo : {});
      } else {
        throw { message: "no todo" };
      }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  })

  .patch(checkAuth, async (req, res) => {
    try {
      const user: User = req.body.user;
      console.log(req.body);
      const newTodo: Todo = req.body.todo;
      const { id: todoId } = req.params;
      const todo = await prisma.todos.findFirst({
        where: { id: Number(todoId) },
      });
      if (todo && user.id === todo.user_id) {
        const todo = await prisma.todos.update({
          where: { id: Number(todoId) },
          data: newTodo,
        });
        res.json(todo ? todo : {});
      } else {
        throw { message: "no todo" };
      }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });

export default router;
