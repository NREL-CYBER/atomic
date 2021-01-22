import React from 'react';
import { AppContent, AppItem, AppText, AppButtons, AppBadge, AppCard } from '..';
/**
 * Display a Query Error
 */

const AppQueryErrorItem = ({
  error
}) => {
  const errorMessage = error && error.message || "Unknown error";
  const property = error && error.property || "!";
  return /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "danger"
  }, /*#__PURE__*/React.createElement(AppText, null, errorMessage), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppBadge, {
    color: "warning"
  }, property))), /*#__PURE__*/React.createElement(AppCard, {
    title: "Is this a bug?"
  }, /*#__PURE__*/React.createElement(AppItem, null, "Please submit an issue!")));
};

export default AppQueryErrorItem;