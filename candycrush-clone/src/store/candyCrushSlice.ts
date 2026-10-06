import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  board: string[];
  boardSize: number;
} = {
  board: [],
  boardSize: 8,
};

const candyCrushSlice = createSlice({
  name: "candyCrush",
  initialState,
  reducers: {},
});

export default candyCrushSlice.reducer;
