import { Router } from "express";
import { deleteTask, getTasks, postTask, updateTask } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// all task routes are protected
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", postTask);
router.put("/:id" , updateTask);
router.delete("/:id", deleteTask);

export default router;
  