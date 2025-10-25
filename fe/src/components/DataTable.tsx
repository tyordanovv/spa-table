import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRows } from "../store/slices/tableSlice";

export const DataTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { rows, loading, error, offset, hasMore } = useAppSelector((state) => state.table);

  useEffect(() => {
    dispatch(fetchRows({ offset: 0, limit: 10 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchRows({ offset, limit: 10 }));
  };

  if (loading && rows.length === 0) return <p>Loading data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <thead>
          <tr>
            <th style={{ padding: "15px", backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd", textAlign: "left" }}>Number</th>
            <th style={{ padding: "15px", backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd", textAlign: "left" }}>Selector</th>
            <th style={{ padding: "15px", backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd", textAlign: "left" }}>Free Text</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ padding: "15px", textAlign: "center", color: "#999" }}>
                No data yet.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                <td style={{ padding: "15px", borderBottom: "1px solid #eee" }}>{row.number}</td>
                <td style={{ padding: "15px", borderBottom: "1px solid #eee" }}>{row.selector}</td>
                <td style={{ padding: "15px", borderBottom: "1px solid #eee" }}>{row.text}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};
