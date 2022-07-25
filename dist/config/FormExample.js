import { AppContent } from "../components";
import React, { useState } from "react";
import { AppPage } from "../components";
import AppForm from "../components/forms/AppForm";
import { useAddress } from "./ExampleConfig";

const ExampleForm = () => {
  const {
    schema,
    insert,
    all,
    collection
  } = useAddress();
  const [status, setStatus] = useState("idle");
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppForm, {
    rootSchema: schema,
    objectSchema: schema.definitions['system_security_plan'],
    data: {},
    onSubmit: () => {}
  })));
};

export default ExampleForm;