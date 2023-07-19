import { createSlice } from "@reduxjs/toolkit";
export interface sidebarSlice {
  value: boolean;
}

export const sidebarSlice = createSlice({
  name: "isSidebarOpen",
  initialState: {
    value: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      console.log(state.value);
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
