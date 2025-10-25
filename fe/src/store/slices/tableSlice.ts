import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableState, TableRow } from "../../types/table.types";
import { tableService } from "../../services/tableService";

const initialState: TableState = {
  rows: [],
  loading: false,
  error: null,
  offset: 0,
  hasMore: true,
};

export const fetchRows = createAsyncThunk(
  'table/fetchRows',
  async ({ offset = 0, limit = 10 }: { offset?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const { items, hasMore } = await tableService.fetchRows(offset, limit);
      return { rows: items, offset, hasMore };
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
    addRow: (state, action: PayloadAction<Omit<TableRow, 'id'>>) => {
      state.rows.push({ ...action.payload, id: Date.now() });
    },
    resetTable: (state) => {
      state.rows = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRows.fulfilled, (state, action) => {
        const { rows, offset, hasMore } = action.payload;
        state.loading = false;
        if (offset === 0) {
          state.rows = rows;
        } else {
          state.rows.push(...rows);
        }
        state.offset = offset + rows.length;
        state.hasMore = hasMore;
      })
      .addCase(fetchRows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRow.fulfilled, (state, action) => {
        state.loading = false;
        state.rows.unshift(action.payload);
      })
      .addCase(createRow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addRow, resetTable } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
