import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/app.scss";
import TaskContextProvider from "./context/TaskContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </React.StrictMode>
);
