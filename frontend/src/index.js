import React from "react";
import ReactDOM from "react-dom/client";  // ✅ React 18's createRoot API
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// ✅ Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found! Make sure your index.html contains a div with id='root'.");
}

const root = ReactDOM.createRoot(rootElement);

// ✅ React 18 concurrent rendering with StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
