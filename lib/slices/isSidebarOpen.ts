import { createSlice } from "@reduxjs/toolkit";
export interface SidebarSlice {
  value: boolean;
}

export const sidebarSlice = createSlice({
  name: "isSidebarOpen",
  initialState: {
    value: false,
  } as SidebarSlice,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
    setIsSidebarOpen: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, setIsSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
