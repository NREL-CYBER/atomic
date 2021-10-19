import React, { useState } from "react";
import { v4 } from "uuid";
import { AppButton, AppCard, AppContent, AppFormComposer, AppItem, AppLabel, AppPage, AppTitle } from "../components";
import AppBinaryImg from "../components/AppBinaryImg";
import { useAddress } from "./ExampleConfig";
import oscal_schema from "../schemas/address.schema.json";

const ExampleForm = () => {
  const {
    schema,
    insert,
    all
  } = useAddress();
  const [status, setStatus] = useState("idle");
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, null, status === "editing" ? /*#__PURE__*/React.createElement(AppFormComposer, {
    objectSchema: oscal_schema.definitions.assessment_plan,
    rootSchema: oscal_schema,
    title: "Address",
    onSubmit: data => {
      insert(v4(), data).then(() => {
        setStatus("idle");
      });
    },
    data: {}
  }) : /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "paper",
    titleColor: "secondary",
    headerColor: "primary",
    title: "Addresses"
  }, all().map(({
    street_address,
    country_name,
    street_view,
    region
  }, i) => {
    return /*#__PURE__*/React.createElement(AppCard, {
      key: i,
      contentColor: "light"
    }, /*#__PURE__*/React.createElement(AppLabel, {
      position: "floating",
      color: "primary"
    }, street_address), street_view && /*#__PURE__*/React.createElement(AppLabel, {
      position: "floating",
      color: "primary"
    }, "Street View"), /*#__PURE__*/React.createElement(AppTitle, null, street_view && /*#__PURE__*/React.createElement(AppBinaryImg, {
      height: "100",
      alt: "Street View",
      binary: atob(street_view)
    })));
  }), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setStatus("editing");
    }
  }, "Add Address")))));
};

export default ExampleForm;