import React, { useState } from "react";
import { AppAvatar, AppButton, AppCard, AppContent, AppFormComposer, AppItem, AppLabel, AppPage, AppTitle } from "../components";
import AppBinaryImg from "../components/AppBinaryImg";
import { findSchemaDefinition } from "../components/forms/AppForm";
import { useAddress } from "./ExampleConfig";

const ExampleForm = () => {
  const {
    schema,
    insert,
    all
  } = useAddress.getState();
  const [status, setStatus] = useState("idle");
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, {
    center: true
  }, status === "editing" ? /*#__PURE__*/React.createElement(AppFormComposer, {
    objectSchema: findSchemaDefinition(schema, 'system_security_plan'),
    rootSchema: schema,
    title: "Address",
    onSubmit: data => {
      insert(data).then(() => {
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
    }, "Address"), /*#__PURE__*/React.createElement(AppTitle, {
      color: "medium"
    }, country_name, "-", street_address, " ", region), /*#__PURE__*/React.createElement(AppLabel, {
      position: "floating",
      color: "primary"
    }, "Street View"), /*#__PURE__*/React.createElement(AppTitle, null, /*#__PURE__*/React.createElement(AppAvatar, null, street_view && /*#__PURE__*/React.createElement(AppBinaryImg, {
      height: "100",
      alt: "Street View",
      binary: atob(street_view)
    }))));
  }), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setStatus("editing");
    }
  }, "Add Address")))));
};

export default ExampleForm;