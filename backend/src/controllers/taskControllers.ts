import { Request, Response } from "express";
import {prisma} from "../prisma-client";

// GET /api/tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// POST /api/tasks
export const postTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { title, description, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;
    const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { title, description, status } = req.body;

    const updated = await prisma.task.updateMany({
      where: {
        id: taskId,
        userId,
      },
      data: {
        title,
        description,
        status,
      },
    });

    if (updated.count === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;
    const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const deleted = await prisma.task.deleteMany({
      where: {
        id: taskId,
        userId,
      },
    });

    if (deleted.count === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
