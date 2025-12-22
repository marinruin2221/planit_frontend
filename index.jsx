// import Client from "react-dom/client";

// import App from "@src/App.jsx";

// const body = document.querySelector("body");
// const root = Client.createRoot(body);

// root.render
// (
// 	<App></App>
// )
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
