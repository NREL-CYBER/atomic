import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import React from 'react';

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
  subTitleColor
}) => {
  return /*#__PURE__*/React.createElement(IonCard, {
    onClick: onClick
  }, /*#__PURE__*/React.createElement(IonCardHeader, null, title && /*#__PURE__*/React.createElement(IonCardTitle, {
    color: titleColor
  }, title), subTitle && /*#__PURE__*/React.createElement(IonCardSubtitle, {
    color: subTitleColor
  }, subTitle)), /*#__PURE__*/React.createElement(IonCardContent, null, children));
};

export default AppCard;