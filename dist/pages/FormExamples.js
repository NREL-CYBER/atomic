import React from 'react';
import { AppButton, AppButtons, AppCard, AppContent, AppItem, AppPage } from "../components";

const FormExamples = () => {
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppCard, {
    titleColor: "primary",
    title: "Welcome to Atomic!"
  }, "Check out the examples to get started", /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    color: "favorite",
    fill: "solid"
  }, "Lets Go"))))));
};

export default FormExamples;