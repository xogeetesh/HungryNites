import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Header";
const App = () => {
  return <h1 className="text-2xl font-bold underline">Hello world!</h1>;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);
