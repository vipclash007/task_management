import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "./taskAPI";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const res = await fetchTasksApi();
    return res.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (data: { title: string; description?: string }) => {
    const res = await createTaskApi(data);
    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "PENDING" | "COMPLETED";
  }) => {
    await updateTaskApi(id, { status });
    return { id, status };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await deleteTaskApi(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state.tasks.find(
          (t) => t.id === action.payload.id
        );
        if (task) task.status = action.payload.status;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default taskSlice.reducer;
