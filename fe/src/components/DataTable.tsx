import React from 'react';
import { TableRow } from '../types/table.types';

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  th: {
    padding: '15px',
    textAlign: 'left' as const,
    backgroundColor: '#f5f5f5',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold' as const
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #eee'
  }
};

export const DataTable: React.FC = () => {
  const rows: TableRow[] = [] // todo detch from store

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Number</th>
          <th style={styles.th}>Selector</th>
          <th style={styles.th}>Free Text</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={3} style={{ ...styles.td, textAlign: 'center', color: '#999' }}>
              No data yet. Add your first row above.
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              <td style={styles.td}>{row.number}</td>
              <td style={styles.td}>{row.selector}</td>
              <td style={styles.td}>{row.text}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};