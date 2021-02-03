import React from "react";
import { AppChip, AppForm, AppPage } from "../components";
import { useAddress } from "./ExampleConfig";

const ExampleForm = () => {
  const {
    validator,
    insert,
    all
  } = useAddress();
  return /*#__PURE__*/React.createElement(AppPage, null, all().map(({
    country_name,
    locality,
    region
  }) => /*#__PURE__*/React.createElement(AppChip, null, " ", country_name + " " + locality + " " + region)), /*#__PURE__*/React.createElement(AppForm, {
    requiredOnly: true,
    onSubmit: insert,
    data: {},
    validator: validator
  }));
};

export default ExampleForm;