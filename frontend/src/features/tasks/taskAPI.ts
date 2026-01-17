import api from "../../utils/axios";

export const fetchTasksApi = () => api.get("/tasks");

export const createTaskApi = (data: {
  title: string;
  description?: string;
}) => api.post("/tasks", data);

export const updateTaskApi = (
  id: string,
  data: { status?: "PENDING" | "COMPLETED"; title?: string }
) => api.put(`/tasks/${id}`, data);

export const deleteTaskApi = (id: string) =>
  api.delete(`/tasks/${id}`);
