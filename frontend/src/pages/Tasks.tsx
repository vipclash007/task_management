import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import type { RootState, AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";
import CreateTask from "../components/CreateTask";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="min-h-screen bg-slate-300 text-slate-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Dashboard</h1>
        <button
          className="btn w-32"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>

      <CreateTask />

      <div className="space-y-4">
        {tasks.length === 0 && (
          <p className="text-gray-800">No tasks yet</p>
        )}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
