import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import type { AppDispatch } from "../app/store";

const CreateTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<{
    title: string;
    description?: string;
  }>();

  const onSubmit = async (data: any) => {
    await dispatch(createTask(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white text-black p-6 rounded-xl mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">Create Task</h2>

      <input
        {...register("title", { required: true })}
        placeholder="Task title"
        className="input"
      />

      <textarea
        {...register("description")}
        placeholder="Description (optional)"
        className="input h-20"
      />

      <button className="btn mt-2">Add Task</button>
    </form>
  );
};

export default CreateTask;
