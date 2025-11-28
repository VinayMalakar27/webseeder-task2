// import { useSelector } from "react-redux";
// import {
//   selectTodoTasks,
//   selectInProgressTasks,
//   selectDoneTasks,
// } from "../features/tasksSlice";
// import TaskCard from "./TaskCard";

// export default function Column({ title, status }) {
//   const tasks =
//     status === "todo"
//       ? useSelector(selectTodoTasks)
//       : status === "in-progress"
//       ? useSelector(selectInProgressTasks)
//       : status === "done"
//       ? useSelector(selectDoneTasks)
//       : [];

//   return (
//     <div
//       className="
//         bg-white border border-gray-200 rounded-2xl 
//         shadow-sm hover:shadow-md transition-all duration-200 
//         p-5 min-h-[300px]
//       "
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-gray-800 font-semibold text-lg">{title}</h2>
//         <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//           {tasks.length}
//         </span>
//       </div>

//       {/* Tasks */}
//       <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
//         {tasks.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-sm">No tasks</p>
//           </div>
//         ) : (
//           tasks.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

import { useSelector } from "react-redux";
import {
  selectTodoTasks,
  selectInProgressTasks,
  selectDoneTasks,
} from "../features/tasksSlice";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Column({ title, status }) {
  const tasks =
    status === "todo"
      ? useSelector(selectTodoTasks)
      : status === "in-progress"
      ? useSelector(selectInProgressTasks)
      : status === "done"
      ? useSelector(selectDoneTasks)
      : [];

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl 
        shadow-sm hover:shadow-md transition-all duration-200 
        p-5 min-h-[200px]
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">{title}</h2>
        <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Tasks - Droppable Area */}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`space-y-3 max-h-[550px] overflow-y-auto pr-1 transition-colors rounded-xl p-2
            ${isOver ? 'bg-blue-50' : ''}`}
        >
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}