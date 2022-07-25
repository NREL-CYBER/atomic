import React from 'react';
import { AppCard } from '.';
import AppItemDivider from './AppItemDivider';
import AppProgress from './AppProgress';
/**
 * Component to show a loading overlay on the application
 */

const AppLoadingCard = ({
  children,
  color = "primary",
  title = "Loading",
  message = ""
}) => /*#__PURE__*/React.createElement(AppCard, {
  title: title,
  titleColor: color,
  subTitle: message
}, /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppProgress, {
  color: color
}), /*#__PURE__*/React.createElement(AppItemDivider, null), children);

export default AppLoadingCard;