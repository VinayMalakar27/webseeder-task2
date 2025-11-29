import { useDispatch } from "react-redux";
import { updateStatus, deleteTask } from "../features/tasksSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const moveTask = (newStatus) => {
    dispatch(updateStatus({ id: task.id, status: newStatus }));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask({ id: task.id }));
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white border border-gray-200 rounded-xl p-4 
        shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50 shadow-xl ring-2 ring-blue-400' : ''}
      `}
    >
      {/* Title + Tag */}
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-gray-800 text-sm">
          {task.title}
        </h3>

        {task.color && (
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: task.color + "20",
              color: task.color,
            }}
          >
            Tag
          </span>
        )}
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 items-center">
        {task.status !== "todo" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveTask("todo");
            }}
            className="text-xs text-gray-500 hover:text-gray-800 transition"
            title="Move to To Do"
          >
            📋
          </button>
        )}

        {task.status !== "in-progress" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveTask("in-progress");
            }}
            className="text-xs text-gray-500 hover:text-gray-800 transition"
            title="Move to In Progress"
          >
            🔄
          </button>
        )}

        {task.status !== "done" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveTask("done");
            }}
            className="text-xs text-gray-500 hover:text-gray-800 transition"
            title="Move to Done"
          >
            ✅
          </button>
        )}

        <button
          onClick={handleDelete}
          className="text-xs text-red-500 hover:text-red-700 transition ml-auto"
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
