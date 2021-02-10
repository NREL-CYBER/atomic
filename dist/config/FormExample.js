import React from "react";
import { AppChip, AppForm, AppPage, AppButton, AppContent, AppCard, AppItem } from "../components";
import { useAddress } from "./ExampleConfig";
import { useState } from "react";

const ExampleForm = () => {
  const {
    validator,
    insert,
    all
  } = useAddress();
  const [status, setStatus] = useState("idle");
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, {
    center: true
  }, status === "editing" ? /*#__PURE__*/React.createElement(AppForm, {
    title: "form",
    requiredOnly: true,
    onSubmit: data => {
      insert(data);
      setStatus("idle");
    },
    data: {},
    validator: validator
  }) : /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    headerColor: "primary",
    title: "Addresses"
  }, all().map(({
    country_name,
    locality,
    region
  }, i) => /*#__PURE__*/React.createElement(AppChip, {
    key: i
  }, " ", country_name + " " + locality + " " + region)), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setStatus("editing");
    }
  }, "Add Address")))));
};

export default ExampleForm;