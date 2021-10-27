import React, { useState } from "react";
import { AppPage } from "../components";
import { useAddress } from "./ExampleConfig";

const ExampleForm = () => {
  const {
    schema,
    insert,
    all
  } = useAddress();
  const [status, setStatus] = useState("idle");
  return /*#__PURE__*/React.createElement(AppPage, null);
};

export default ExampleForm;