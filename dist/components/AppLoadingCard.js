import React from 'react';
import { AppCard } from '.';
import AppProgress from './AppProgress';
/**
 * Component to show a loading overlay on the application
 */

const AppLoadingCard = ({
  color,
  title,
  message
}) => /*#__PURE__*/React.createElement(AppCard, {
  title: title,
  titleColor: color,
  subTitle: message
}, /*#__PURE__*/React.createElement(AppProgress, {
  color: color
}));

export default AppLoadingCard;