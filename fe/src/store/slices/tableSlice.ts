import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableState, TableRow } from "../../types/table.types";
import { tableService } from "../../services/tableService";

const initialState: TableState = {
  rows: [],
  loading: false,
  error: null,
};

export const fetchRows = createAsyncThunk(
  'table/fetchRows',
  async (_, { rejectWithValue }) => {
    try {
      const rows = await tableService.fetchRows();
      return rows;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch rows');
    }
  }
);

export const createRow = createAsyncThunk(
  'table/createRow',
  async (row: Omit<TableRow, 'id'>, { rejectWithValue }) => {
    try {
      const created = await tableService.createRow(row);
      return created;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create row');
    }
  }
);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // purely local update (optional optimistic)
    addRow: (state, action: PayloadAction<Omit<TableRow, 'id'>>) => {
      state.rows.push({ ...action.payload, id: Date.now() });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRows.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchRows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRow.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRow.fulfilled, (state, action) => {
        state.loading = false;
        state.rows.push(action.payload);
      })
      .addCase(createRow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addRow } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;