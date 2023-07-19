import { createSlice } from "@reduxjs/toolkit";
export interface SidebarSlice {
  value: boolean;
}
console.log("object");
export const sidebarSlice = createSlice({
  name: "isSidebarOpen",
  initialState: {
    value: false,
  } as SidebarSlice,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
