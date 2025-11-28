// import { useState } from "react";
// import Column from "../components/Column";
// import AddTaskModal from "../components/AddTaskModal";

// export default function Board() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Background Decoration */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-20 border-b border-white/10 backdrop-blur-xl sticky top-0">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                 TaskBoard
//               </h1>
//               <p className="text-gray-400 text-sm">Organize your workflow efficiently</p>
//             </div>

//             <button
//               onClick={() => setShowModal(true)}
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
//             >
//               <span>✨</span> Add Task
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-slate-800 border border-white/10 w-full max-w-md rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-white">Create Task</h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-white text-3xl transition-colors"
//               >
//                 ✕
//               </button>
//             </div>

//             <AddTaskModal onClose={() => setShowModal(false)} />
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <Column title="📋 To Do" status="todo" />
//           <Column title="⚙️ In Progress" status="in-progress" />
//           <Column title="✅ Completed" status="done" />
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl mt-16">
//         <div className="max-w-6xl mx-auto px-6 py-8 text-center">
//           <p className="text-gray-400 text-sm">
//             💡 Pro tip: Click task buttons to move between columns
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { useState } from "react";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";

export default function Board() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Frentent Task 4 - Simple Kanban Board
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            + New Task
          </button>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create Task</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <AddTaskModal onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Column title="To Do" status="todo" />
          <Column title="In Progress" status="in-progress" />
          <Column title="Done" status="done" />
        </div>
      </main>

    </div>
  );
}

