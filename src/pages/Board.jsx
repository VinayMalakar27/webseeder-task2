import { useState } from "react";
import { useDispatch } from "react-redux";
import { reorderTasks } from "../features/tasksSlice";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";

export default function Board() {
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over.data.current?.sortable?.containerId || over.id;
    const activeIndex = active.data.current?.sortable?.index;
    const overIndex = over.data.current?.sortable?.index ?? 0;

    // Only dispatch if we have valid data
    if (activeContainer && overContainer && activeIndex !== undefined) {
      dispatch(
        reorderTasks({
          sourceStatus: activeContainer,
          destStatus: overContainer,
          sourceIndex: activeIndex,
          destIndex: overIndex,
          taskId: active.id, // Pass the task ID for reliable lookup
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-white/10
 from-gray-50 to-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Simple Kanban Board
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
          >
            + New Task
          </button>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.35)]

 p-6 w-full max-w-md animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create Task</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            <AddTaskModal onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Main Content with Drag and Drop */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Column title="To Do" status="todo" />
            <Column title="In Progress" status="in-progress" />
            <Column title="Done" status="done" />
          </div>
          
          <DragOverlay>
            {activeId ? (
              <div className="bg-white border-2 border-blue-400 rounded-xl p-4 shadow-2xl opacity-90 cursor-grabbing">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Moving task...</span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

    </div>
  );
}
