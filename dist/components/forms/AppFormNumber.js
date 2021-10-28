/* eslint-disable react-hooks/exhaustive-deps */
import { IonLabel, IonRange } from '@ionic/react';
import React, { useState } from 'react';
import { AppItem } from '..';
import { prettyTitle } from '../../util';
import { inputStatusColorMap } from '../AppFormInput';
import { AppFormErrorsItem } from './AppFormErrorsItem';
import { AppFormLabel } from './AppFormLabel';
/**
 * Component for input that displays validation errors
 */

const AppFormNumber = props => {
  const {
    property,
    instanceRef,
    onChange,
    propertyInfo,
    required
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState(typeof instanceRef.current[property] === "number" ? "valid" : "empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || 0);
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  const statusColor = inputStatusColorMap[inputStatus];
  const max = propertyInfo.maximum || 1;
  const min = propertyInfo.minimum || 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear",
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: statusColor
  }), /*#__PURE__*/React.createElement(IonRange, {
    value: value * 1000 * (max - min),
    max: 1000,
    min: 0,
    onIonChange: v => {
      const scaledValue = v.detail.value / 1000 * (max - min);
      onChange(property, scaledValue).then(([validationStatus, validationErrors]) => {
        setValue(scaledValue);
        setInputStatus(validationStatus);
        setErrors(validationErrors || []);
      });
    }
  }, /*#__PURE__*/React.createElement(IonLabel, {
    slot: "start"
  }, min), /*#__PURE__*/React.createElement(IonLabel, {
    slot: "end"
  }, max))), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormNumber;