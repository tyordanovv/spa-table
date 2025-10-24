export interface TableRow {
  id: number;
  number: string;
  selector: string;
  text: string;
}

export interface TableState {
  rows: TableRow[];
  loading?: boolean;
  error?: string | null;
}
