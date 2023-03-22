import React from 'react'

export default function ResponseCounts({ responses }) {
    const successCount = responses.filter((response) => response.status === "success").length;
    const errorCount = responses.filter((response) => response.status === "error").length;
  
    return (
      <div>
        <h2>Response Counts</h2>
        <p>Success: {successCount}</p>
        <p>Error: {errorCount}</p>
      </div>
    );
  }
  