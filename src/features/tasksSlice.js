// import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

// const loadTasks = () => {
//   try {
//     if (typeof window === "undefined") return [];
//     const raw = localStorage.getItem("tasks");
//     return raw ? JSON.parse(raw) : [];
//   } catch (e) {
//     return [];
//   }
// };

// const initialState = {
//   tasks: loadTasks(),
// };

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addTask: {
//       reducer(state, action) {
//         state.tasks.push(action.payload);
//         try {
//           if (typeof window !== "undefined") {
//             localStorage.setItem("tasks", JSON.stringify(state.tasks));
//           }
//         } catch (e) {
//           // ignore localStorage errors
//         }
//       },
//       prepare(title, description, color) {
//         return {
//           payload: {
//             id: nanoid(),
//             title,
//             description,
//             status: "todo",
//             color,
//           },
//         };
//       },
//     },

//     updateStatus(state, action) {
//       const { id, status } = action.payload;
//       const task = state.tasks.find((t) => t.id === id);
//       if (task) task.status = status;

//       try {
//         if (typeof window !== "undefined") {
//           localStorage.setItem("tasks", JSON.stringify(state.tasks));
//         }
//       } catch (e) {
//         // ignore localStorage errors
//       }
//     },
//   },
// });

// export const { addTask, updateStatus } = tasksSlice.actions;
// export default tasksSlice.reducer;

// export const selectTasks = (state) => state.tasks.tasks;

// export const selectTodoTasks = createSelector(
//   [selectTasks],
//   (tasks) => tasks.filter((t) => t.status === "todo")
// );

// export const selectInProgressTasks = createSelector(
//   [selectTasks],
//   (tasks) => tasks.filter((t) => t.status === "in-progress")
// );

// export const selectDoneTasks = createSelector(
//   [selectTasks],
//   (tasks) => tasks.filter((t) => t.status === "done")
// );

import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

const loadTasks = () => {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
          }
        } catch (e) {
          // ignore localStorage errors
        }
      },
      prepare(title, description, color) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            status: "todo",
            color,
            order: Date.now(),
          },
        };
      },
    },

    updateStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
        task.order = Date.now();
      }

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      } catch (e) {
        // ignore localStorage errors
      }
    },

    reorderTasks(state, action) {
      const { sourceStatus, destStatus, sourceIndex, destIndex } = action.payload;
      
      // Get all tasks for source and destination columns
      const sourceTasks = state.tasks
        .filter(t => t.status === sourceStatus)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      const destTasks = sourceStatus === destStatus 
        ? sourceTasks 
        : state.tasks
            .filter(t => t.status === destStatus)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      if (sourceStatus === destStatus) {
        // Reordering within same column
        if (sourceIndex === destIndex) return;
        
        // Validate for same-column reorder
        if (sourceIndex < 0 || sourceIndex >= sourceTasks.length) {
          console.error("Invalid source index for same column");
          return;
        }
        
        const [movedTask] = sourceTasks.splice(sourceIndex, 1);
        sourceTasks.splice(destIndex, 0, movedTask);
        
        // Update order for all tasks in this column
        sourceTasks.forEach((task, index) => {
          const originalTask = state.tasks.find(t => t.id === task.id);
          if (originalTask) {
            originalTask.order = index;
          }
        });
      } else {
        // Moving between columns
        if (sourceTasks.length === 0) {
          console.error("No tasks in source column");
          return;
        }
        
        // For cross-column moves, validate differently
        if (sourceIndex < 0 || sourceIndex >= sourceTasks.length) {
          console.error("Invalid source index for cross-column move");
          return;
        }
        
        const movedTask = sourceTasks[sourceIndex];
        
        if (!movedTask) {
          console.error("Task not found at source index");
          return;
        }
        
        // Find the actual task in state and update its status
        const taskInState = state.tasks.find(t => t.id === movedTask.id);
        if (!taskInState) {
          console.error("Task not found in state");
          return;
        }
        
        taskInState.status = destStatus;
        
        // Rebuild dest tasks with the new task included
        const updatedDestTasks = state.tasks
          .filter(t => t.status === destStatus)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Remove the moved task and insert at correct position
        const movedIndex = updatedDestTasks.findIndex(t => t.id === movedTask.id);
        if (movedIndex !== -1) {
          updatedDestTasks.splice(movedIndex, 1);
        }
        updatedDestTasks.splice(destIndex, 0, taskInState);
        
        // Update order for source column (excluding moved task)
        const updatedSourceTasks = state.tasks
          .filter(t => t.status === sourceStatus)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        
        updatedSourceTasks.forEach((task, index) => {
          const originalTask = state.tasks.find(t => t.id === task.id);
          if (originalTask) {
            originalTask.order = index;
          }
        });
        
        // Update order for destination column
        updatedDestTasks.forEach((task, index) => {
          const originalTask = state.tasks.find(t => t.id === task.id);
          if (originalTask) {
            originalTask.order = index;
          }
        });
      }
      
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      } catch (e) {
        console.error("localStorage error:", e);
      }
    },

    deleteTask(state, action) {
      const { id } = action.payload;
      state.tasks = state.tasks.filter(t => t.id !== id);
      
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      } catch (e) {
        // ignore localStorage errors
      }
    },

    editTask(state, action) {
      const { id, title, description, color } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (color !== undefined) task.color = color;
      }
      
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      } catch (e) {
        // ignore localStorage errors
      }
    },
  },
});

export const { addTask, updateStatus, reorderTasks, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = (state) => state.tasks.tasks;

export const selectTodoTasks = createSelector(
  [selectTasks],
  (tasks) => tasks
    .filter((t) => t.status === "todo")
    .sort((a, b) => (a.order || 0) - (b.order || 0))
);

export const selectInProgressTasks = createSelector(
  [selectTasks],
  (tasks) => tasks
    .filter((t) => t.status === "in-progress")
    .sort((a, b) => (a.order || 0) - (b.order || 0))
);

export const selectDoneTasks = createSelector(
  [selectTasks],
  (tasks) => tasks
    .filter((t) => t.status === "done")
    .sort((a, b) => (a.order || 0) - (b.order || 0))
);