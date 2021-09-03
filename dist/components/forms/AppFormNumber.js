/* eslint-disable react-hooks/exhaustive-deps */
import { IonLabel, IonRange } from '@ionic/react';
import React, { useMemo, useState } from 'react';
import { AppItem, AppLabel, AppText } from '..';
import { prettyTitle } from '../../util';
import { inputStatusColorMap } from '../AppFormInput';

/**
 * Component for input that displays validation errors
 */
const AppFormNumber = props => {
  const {
    property,
    instanceRef,
    onChange,
    propertyInfo
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || 0);
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  const statusColor = inputStatusColorMap[inputStatus];
  const max = propertyInfo.maximum || 1;
  const min = propertyInfo.minimum || 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear",
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    color: statusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(IonRange, {
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
  }, max))), useMemo(() => errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map((error, i) => /*#__PURE__*/React.createElement(AppText, {
    key: i
  }, error)))), [errors]));
};

export default AppFormNumber;