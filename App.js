import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Body from "./src/components/Body";
import Shimmer from "./src/components/Shimmer";

const AppLayout = () => {
  return (
    <>
      <Header />
      {/* <Shimmer /> */}
      <Body />
      <Footer />
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
