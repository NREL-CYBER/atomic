import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import AppTitle from "./AppTitle";

/**
 * Provides an area with padding, and title
 * put anything and everything in cards for continuity
 */
const AppCard = ({
  onClick,
  children,
  title,
  titleColor,
  subTitle,
  subTitleColor,
  contentColor = "paper",
  headerColor = "light"
}) => {
  return /*#__PURE__*/React.createElement(IonCard, {
    color: contentColor,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(IonCardHeader, {
    color: headerColor
  }, typeof title === "string" ? /*#__PURE__*/React.createElement(IonCardTitle, null, /*#__PURE__*/React.createElement(AppTitle, {
    color: titleColor
  }, title), " ") : title, subTitle && /*#__PURE__*/React.createElement(IonCardSubtitle, {
    color: subTitleColor
  }, subTitle)), /*#__PURE__*/React.createElement(IonCardContent, null, children));
};

export default AppCard;