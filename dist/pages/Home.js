import React from 'react';
import { AppButton, AppButtons, AppCard, AppContent, AppItem, AppPage } from '../components';

const Home = () => {
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    titleColor: "primary",
    title: "Welcome to Atomic!"
  }, "Check out the examples to get started", /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    routerLink: "/form",
    color: "favorite",
    fill: "solid"
  }, "Form Example"))))));
};

export default Home;