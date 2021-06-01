import React, { useState } from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppItem, AppItemDivider, AppLabel, AppPage, AppSelect, AppSelectOption } from '../components';

const Home = () => {
  const [val, setVal] = useState();
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "primary",
    titleColor: "secondary",
    title: "Welcome to atomic",
    subTitle: "@nrel/atomic"
  }, /*#__PURE__*/React.createElement(AppChip, {
    color: "success"
  }, "Check out the examples to get started"), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppChip, null, "AppColors"), /*#__PURE__*/React.createElement(AppItem, {
    color: "primary"
  }, "Primary"), /*#__PURE__*/React.createElement(AppItem, {
    color: "secondary"
  }, "Secondary"), /*#__PURE__*/React.createElement(AppItem, {
    color: "tertiary"
  }, "Tertiary"), /*#__PURE__*/React.createElement(AppItem, {
    color: "success"
  }, "Success"), /*#__PURE__*/React.createElement(AppItem, {
    color: "favorite"
  }, "Favorite"), /*#__PURE__*/React.createElement(AppItem, {
    color: "warning"
  }, "Warning"), /*#__PURE__*/React.createElement(AppItem, {
    color: "danger"
  }, "Danger"), /*#__PURE__*/React.createElement(AppItem, {
    color: "light"
  }, "Light"), /*#__PURE__*/React.createElement(AppItem, {
    color: "dark"
  }, "Dark"), /*#__PURE__*/React.createElement(AppItem, {
    color: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement(AppItem, {
    color: "paper"
  }, "Paper"), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    routerLink: "/form",
    color: "primary",
    fill: "solid"
  }, "Form Example"))), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, null, "AppSelect"), /*#__PURE__*/React.createElement(AppSelect, {
    onSelectionChange: setVal,
    value: val,
    color: typeof val === "undefined" ? "warning" : "success",
    placeholder: "Environment"
  }, /*#__PURE__*/React.createElement(AppSelectOption, {
    value: "Development"
  }), /*#__PURE__*/React.createElement(AppSelectOption, {
    value: "Production"
  }))))));
};

export default Home;