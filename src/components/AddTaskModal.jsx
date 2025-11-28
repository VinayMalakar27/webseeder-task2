// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTask } from "../features/tasksSlice";

// export default function AddTaskModal({ onClose }) {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [color, setColor] = useState("#3b82f6");
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();

//   const handleAdd = () => {
//     if (!title.trim()) {
//       setError("Task title is required");
//       return;
//     }

//     setError("");
//     dispatch(addTask(title, desc, color));
//     onClose?.();
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && e.ctrlKey) handleAdd();
//   };

//   return (
//     <div className="space-y-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto">

//       {/* Title */}
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-1">
//           Task Title <span className="text-red-500">*</span>
//         </label>

//         <input
//           autoFocus
//           type="text"
//           className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-800
//             transition-all duration-200 shadow-sm
//             ${error ? "border-red-400" : "border-gray-300 focus:border-blue-500"}
//             focus:outline-none focus:ring-2 focus:ring-blue-200`}
//           placeholder="Enter task title..."
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//             setError("");
//           }}
//           onKeyPress={handleKeyPress}
//         />

//         {error && (
//           <p className="text-red-500 text-xs mt-1">{error}</p>
//         )}
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-1">
//           Description
//         </label>

//         <textarea
//           className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50
//             text-gray-800 shadow-sm resize-none h-24
//             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
//           placeholder="Add details about the task..."
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//       </div>

//       {/* Color Picker */}
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-2">
//           Label Color
//         </label>

//         <div className="flex items-center gap-4">
//           <div className="flex gap-2">
//             {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"].map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setColor(c)}
//                 className={`
//                   w-7 h-7 rounded-full border transition-all
//                   ${color === c ? "ring-2 ring-blue-500 scale-110" : "border-gray-300 hover:scale-105"}
//                 `}
//                 style={{ backgroundColor: c }}
//               ></button>
//             ))}
//           </div>

//           <span className="text-sm font-mono text-gray-500">{color}</span>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 pt-2">
//         <button
//           onClick={onClose}
//           className="px-5 py-3 font-semibold rounded-xl bg-gray-100 text-gray-700
//             hover:bg-gray-200 transition shadow-sm"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={handleAdd}
//           className="px-6 py-3 font-semibold rounded-xl bg-blue-600 text-white
//             hover:bg-blue-700 transition shadow shadow-blue-200"
//         >
//           Create Task
//         </button>
//       </div>
//     </div>
//   );
// }








import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";

export default function AddTaskModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setError("");
    dispatch(addTask(title, desc, color));
    onClose?.();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleAdd();
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Task Title <span className="text-red-500">*</span>
        </label>

        <input
          autoFocus
          type="text"
          className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-800
            transition-all duration-200 shadow-sm
            ${error ? "border-red-400" : "border-gray-300 focus:border-blue-500"}
            focus:outline-none focus:ring-2 focus:ring-blue-200`}
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          onKeyPress={handleKeyPress}
        />

        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>

        <textarea
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50
            text-gray-800 shadow-sm resize-none h-24
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          placeholder="Add details about the task..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Color Picker */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Label Color
        </label>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`
                  w-7 h-7 rounded-full border transition-all
                  ${color === c ? "ring-2 ring-blue-500 scale-110" : "border-gray-300 hover:scale-105"}
                `}
                style={{ backgroundColor: c }}
              ></button>
            ))}
          </div>

          <span className="text-sm font-mono text-gray-500">{color}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onClose}
          className="px-5 py-3 font-semibold rounded-xl bg-gray-100 text-gray-700
            hover:bg-gray-200 transition shadow-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleAdd}
          className="px-6 py-3 font-semibold rounded-xl bg-blue-600 text-white
            hover:bg-blue-700 transition shadow shadow-blue-200"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}