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

//   const styles = {
//     todo: {
//       bg: "bg-gradient-to-b from-red-500/10 to-red-500/5",
//       border: "border-t-4 border-red-500",
//       badge: "bg-red-500/20 text-red-300",
//       header: "text-red-300",
//     },
//     "in-progress": {
//       bg: "bg-gradient-to-b from-yellow-500/10 to-yellow-500/5",
//       border: "border-t-4 border-yellow-500",
//       badge: "bg-yellow-500/20 text-yellow-300",
//       header: "text-yellow-300",
//     },
//     done: {
//       bg: "bg-gradient-to-b from-green-500/10 to-green-500/5",
//       border: "border-t-4 border-green-500",
//       badge: "bg-green-500/20 text-green-300",
//       header: "text-green-300",
//     },
//   }[status];

//   return (
//     <div
//       className={`
//         ${styles.bg} ${styles.border}
//         rounded-2xl backdrop-blur-xl border border-white/10
//         shadow-xl p-6 min-h-[200px]
//         transition-all duration-300 hover:shadow-2xl hover:border-opacity-100
//       `}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
//         <h2 className={`${styles.header} font-bold text-xl tracking-wide`}>
//           {title}
//         </h2>
//         <span className={`${styles.badge} px-3 py-1 rounded-full text-sm font-bold`}>
//           {tasks.length}
//         </span>
//       </div>

//       {/* Tasks Container */}
//       <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
//         {tasks.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-gray-500 text-lg font-medium mb-2">No tasks</p>
//             <p className="text-gray-600 text-sm">Add your first task to get started</p>
//           </div>
//         ) : (
//           tasks.map((task, idx) => (
//             <div
//               key={task.id}
//               className="animate-in fade-in slide-in-from-top duration-300"
//               style={{ animationDelay: `${idx * 50}ms` }}
//             >
//               <TaskCard task={task} />
//             </div>
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

export default function Column({ title, status }) {
  const tasks =
    status === "todo"
      ? useSelector(selectTodoTasks)
      : status === "in-progress"
      ? useSelector(selectInProgressTasks)
      : status === "done"
      ? useSelector(selectDoneTasks)
      : [];

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl 
        shadow-sm hover:shadow-md transition-all duration-200 
        p-5 min-h-[300px]
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">{title}</h2>
        <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
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
    </div>
  );
}
