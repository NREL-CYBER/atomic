import React, { useEffect, useState } from 'react';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppFormSelect = props => {
  const {
    propertyInfo,
    instanceRef,
    validator,
    onValid,
    property
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || "");
  const propertyFormattedName = titleCase(propertyInfo.title);
  useEffect(() => {
    const change = {
      [property]: value
    };
    instanceRef.current = { ...instanceRef.current,
      ...change
    };
    validator.validate(instanceRef.current);
    const allErrors = validator.validate.errors || [];
    const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property));

    if (propertyErrors.length === 0 && value) {
      setInputStatus("valid");
      onValid(property);
      setErrors([]);
      return;
    } else if (value) {
      setInputStatus("invalid");
    } else {
      setInputStatus("empty");
    }

    setErrors(propertyErrors);
  }, [instanceRef, onValid, property, validator, value]);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  return <AppItem>
        <AppLabel position="stacked" color={inputStatusColor}>
            {propertyFormattedName}
        </AppLabel>
        <AppSelect interface="popover" value={value} placeholder={propertyFormattedName} onSelectionChange={val => {
      setValue(val);
    }}>
            {propertyInfo.enum.map(enumValue => <AppSelectOption key={enumValue} value={enumValue} children={titleCase(enumValue)} />)}
        </AppSelect>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error.message}
            </AppText>)}
        </AppLabel>
    </AppItem>;
};

export default AppFormSelect;