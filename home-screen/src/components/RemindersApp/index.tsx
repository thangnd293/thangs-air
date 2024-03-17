import React, { useEffect, useRef } from "react";

import { render } from "reminders/RemindersApp";

const RemindersApp = () => {
  const ref = useRef<any>(null);
  console.log("Render Remote RemindersApp");

  useEffect(() => {
    render(ref.current);
  }, []);

  return <div className="reminders-app" ref={ref} />;
};

export default RemindersApp;
