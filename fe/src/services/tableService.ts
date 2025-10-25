import { api } from './api';
import { TableRow } from '../types/table.types';

export const tableService = {
  fetchRows: async (offset = 0, limit = 10) => {
    const response = await api.get('/api/rows', { params: { offset, limit } });
    return response.data;
  }, 

  createRow: async (row: Omit<TableRow, 'id'>): Promise<TableRow> => {
    const response = await api.post<TableRow>('/api/rows', row);
    return response.data;
  },
};
