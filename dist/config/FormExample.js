import React, { useState } from "react";
import { AppButton, AppCard, AppContent, AppForm, AppItem, AppLabel, AppPage, AppTitle, AppAvatar } from "../components";
import { useAddress } from "./ExampleConfig";
import { binaryToFileUri } from "../util";
import AppBinaryImg from "../components/AppBinaryImg";

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
    street_address,
    country_name,
    street_view,
    region
  }, i) => {
    const file_uri = binaryToFileUri(street_view, "image/png");
    return /*#__PURE__*/React.createElement(AppCard, null, /*#__PURE__*/React.createElement(AppLabel, {
      key: i,
      position: "floating",
      color: "primary"
    }, "Address"), /*#__PURE__*/React.createElement(AppTitle, {
      color: "medium"
    }, country_name, "-", street_address), /*#__PURE__*/React.createElement(AppLabel, {
      key: i,
      position: "floating",
      color: "primary"
    }, "Street View"), /*#__PURE__*/React.createElement(AppTitle, null, /*#__PURE__*/React.createElement(AppAvatar, null, /*#__PURE__*/React.createElement(AppBinaryImg, {
      height: "100",
      alt: "Street View",
      binary: street_view
    }))));
  }), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setStatus("editing");
    }
  }, "Add Address")))));
};

export default ExampleForm;