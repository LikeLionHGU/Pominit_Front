import React from "react";

function Testpage() {
  return (
    <div className="container frame">
      
      <div className="grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

export default Testpage;
