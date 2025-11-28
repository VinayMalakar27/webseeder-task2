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
          },
        };
      },
    },

    updateStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.status = status;

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

export const { addTask, updateStatus } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = (state) => state.tasks.tasks;

export const selectTodoTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((t) => t.status === "todo")
);

export const selectInProgressTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((t) => t.status === "in-progress")
);

export const selectDoneTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((t) => t.status === "done")
);
