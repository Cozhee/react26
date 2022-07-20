import React from "react";
import "./results.scss";

function Results({ data, count }) {
  return (
    <section>
      <p>Number of calls: {count}</p>
      <pre data-testid="test-results">
        {data ? JSON.stringify(data, undefined, 2) : null}
      </pre>
    </section>
  );
}

export default Results;
