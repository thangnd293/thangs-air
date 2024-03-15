import React, { useEffect, useRef } from "react";

import { render } from "app1/App1";
import Window from "../Window";

const App1 = () => {
  const ref = useRef<any>(null);
  console.log("Render Remote");
  useEffect(() => {
    render(ref.current);
  }, []);

  return (
    <Window>
      <div ref={ref} />
    </Window>
  );
};

export default App1;
