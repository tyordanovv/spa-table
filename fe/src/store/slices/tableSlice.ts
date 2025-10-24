import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableState, TableRow } from "../../types/table.types";

const initialState: TableState = {
  rows: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<Omit<TableRow, "id">>) => {
      state.rows.push({
        ...action.payload,
        id: Date.now(),
      });
    },
  },
});

export const { addRow } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
