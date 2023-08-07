import Main from "@/components/Main";
import React from "react";
import { useSelector } from "react-redux";

function index() {
  useSelector((state) => console.log(state, "redux test"));
  return <Main />;
}

export default index;
