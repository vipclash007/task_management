import { updateTask, deleteTask } from "../features/tasks/taskSlice";
import type { Task} from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

const TaskCard = ({ task }: { task: Task }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white text-black p-4 rounded-lg flex justify-between items-center">
      <div className="space-y-2">
        <h3 className="font-medium">{task.title}</h3>
        <p className="">{task.description}</p>
        <p className="text-sm text-gray-600">{task.status}</p>
      </div>

      <div className="flex gap-3">
        <button
          className="px-3 py-1 border border-black rounded"
          onClick={() =>
            dispatch(
              updateTask({
                id: task.id,
                status:
                  task.status === "PENDING"
                    ? "COMPLETED"
                    : "PENDING",
              })
            )
          }
        >
          Toggle
        </button>

        <button
          className="px-3 py-1 bg-black text-white rounded"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
