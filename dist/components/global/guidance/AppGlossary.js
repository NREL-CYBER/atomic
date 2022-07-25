import React from 'react';
import AppButtons from '../../AppButtons';
import AppItem from '../../AppItem';
import AppPage from '../../AppPage';
import AppLabel from '../../AppLabel';

const AppGlossary = ({
  glossary
}) => /*#__PURE__*/React.createElement(AppPage, null, Object.entries(glossary.records).map(([word, definition]) => /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
  slot: "start"
}, /*#__PURE__*/React.createElement(AppLabel, null, word)), /*#__PURE__*/React.createElement(AppButtons, {
  slot: "end"
}, /*#__PURE__*/React.createElement(AppLabel, null, definition)))), /*#__PURE__*/React.createElement(AppItem, null));

export default AppGlossary;