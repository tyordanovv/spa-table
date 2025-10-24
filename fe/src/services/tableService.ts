import { api } from './api';
import { TableRow } from '../types/table.types';

export const tableService = {
  fetchRows: async (): Promise<TableRow[]> => {
    const response = await api.get<TableRow[]>('/rows');
    return response.data;
  },

  createRow: async (row: Omit<TableRow, 'id'>): Promise<TableRow> => {
    const response = await api.post<TableRow>('/rows', row);
    return response.data;
  },
};