// import { useDispatch } from "react-redux";
// import { updateStatus } from "../features/tasksSlice";

// export default function TaskCard({ task }) {
//   const dispatch = useDispatch();

//   const moveTask = (newStatus) => {
//     dispatch(updateStatus({ id: task.id, status: newStatus }));
//   };

//   return (
//     <div
//       className="
//         group bg-slate-700/50 hover:bg-slate-700 border border-white/10 hover:border-white/20
//         rounded-xl p-4 backdrop-blur-sm
//         transition-all duration-300 cursor-pointer
//         shadow-md hover:shadow-xl hover:-translate-y-0.5
//       "
//       style={{ borderLeftColor: task.color, borderLeftWidth: "4px" }}
//     >
//       {/* Title & Color Dot */}
//       <div className="flex items-start gap-3 mb-2">
//         <div
//           className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-lg"
//           style={{ backgroundColor: task.color }}
//         ></div>
//         <h3 className="font-bold text-white text-sm leading-tight flex-1 group-hover:text-blue-300 transition-colors">
//           {task.title}
//         </h3>
//       </div>

//       {/* Description */}
//       {task.description && (
//         <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors ml-5.5">
//           {task.description}
//         </p>
//       )}

//       {/* Action Buttons - Hidden until hover */}
//       <div className="flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//         {task.status !== "todo" && (
//           <button
//             onClick={() => moveTask("todo")}
//             className="
//               text-xs px-2.5 py-1 rounded-md font-medium
//               bg-red-500/20 text-red-300 hover:bg-red-500/30
//               border border-red-500/30 hover:border-red-500/50
//               transition-all duration-200 active:scale-95
//             "
//           >
//             📋 To Do
//           </button>
//         )}

//         {task.status !== "in-progress" && (
//           <button
//             onClick={() => moveTask("in-progress")}
//             className="
//               text-xs px-2.5 py-1 rounded-md font-medium
//               bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30
//               border border-yellow-500/30 hover:border-yellow-500/50
//               transition-all duration-200 active:scale-95
//             "
//           >
//             ⚙️ Progress
//           </button>
//         )}

//         {task.status !== "done" && (
//           <button
//             onClick={() => moveTask("done")}
//             className="
//               text-xs px-2.5 py-1 rounded-md font-medium
//               bg-green-500/20 text-green-300 hover:bg-green-500/30
//               border border-green-500/30 hover:border-green-500/50
//               transition-all duration-200 active:scale-95
//             "
//           >
//             ✅ Done
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import { useDispatch } from "react-redux";
import { updateStatus } from "../features/tasksSlice";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const moveTask = (newStatus) => {
    dispatch(updateStatus({ id: task.id, status: newStatus }));
  };

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-xl p-4 
        shadow-sm hover:shadow-md transition-all duration-200
      "
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
      <div className="flex gap-2">
        {task.status !== "todo" && (
          <button
            onClick={() => moveTask("todo")}
            className="text-xs text-gray-500 hover:text-gray-800 transition"
          >
            📋
          </button>
        )}

        {task.status !== "in-progress" && (
          <button
            onClick={() => moveTask("in-progress")}
            className="text-xs text-gray-500 hover:text-gray-800 transition"
          >
            🔄
          </button>
        )}

        {task.status !== "done" && (
          <button
            onClick={() => moveTask("done")}
            className="text-xs text-gray-500 hover:text-gray-800 transition"
          >
            ✅
          </button>
        )}
      </div>
    </div>
  );
}

