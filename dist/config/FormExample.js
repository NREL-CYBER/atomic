import React, { useState } from "react";
import { AppButton, AppCard, AppContent, AppForm, AppItem, AppLabel, AppPage, AppTitle, AppAvatar } from "../components";
import { useAddress } from "./ExampleConfig";
import AppBinaryImg from "../components/AppBinaryImg";
import { useCompletion } from "../hooks";
import { useEffect } from "react";

const ExampleForm = () => {
  const {
    validator,
    insert,
    all
  } = useAddress.getState();
  const {
    setPathState
  } = useCompletion();
  useEffect(() => {
    setPathState("/Form", "valid");
    setPathState("/", "valid");
  }, [setPathState]);
  const [status, setStatus] = useState("idle");
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, {
    center: true
  }, status === "editing" ? /*#__PURE__*/React.createElement(AppForm, {
    title: "Address",
    requiredOnly: true,
    onSubmit: data => {
      insert(data);
      setStatus("idle");
    },
    data: {},
    validator: validator
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
      contentColor: "light"
    }, /*#__PURE__*/React.createElement(AppLabel, {
      key: i,
      position: "floating",
      color: "primary"
    }, "Address"), /*#__PURE__*/React.createElement(AppTitle, {
      color: "medium"
    }, country_name, "-", street_address, " ", region), /*#__PURE__*/React.createElement(AppLabel, {
      key: i,
      position: "floating",
      color: "primary"
    }, "Street View"), /*#__PURE__*/React.createElement(AppTitle, null, /*#__PURE__*/React.createElement(AppAvatar, null, /*#__PURE__*/React.createElement(AppBinaryImg, {
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