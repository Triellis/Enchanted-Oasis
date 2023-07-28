import { createSlice } from "@reduxjs/toolkit";
export interface Theme {
  value: "light" | "dark";
}

export const sidebarSlice = createSlice({
  name: "isSidebarOpen",
  initialState: {
    value: "dark",
  } as Theme,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = sidebarSlice.actions;

export default sidebarSlice.reducer;
