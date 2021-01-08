import FormComposer from './forms/AppFormComposer';
import { addOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import titleCase from '../util/titleCase';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppFormArrayInput = props => {
  const {
    property,
    instanceRef,
    validator,
    propertyInfo
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property]);
  const propertyFormattedName = titleCase(property).replace("-", " ");
  useEffect(() => {
    const change = {};
    change[property] = value;
    instanceRef.current = { ...instanceRef.current,
      ...change
    };
    validator.validate(instanceRef.current);
    const allErrors = validator.validate.errors || [];
    const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property));

    if (propertyErrors.length === 0 && value) {
      setInputStatus("valid");
    } else if (value) {
      setInputStatus("invalid");
    } else {
      setInputStatus("empty");
    }

    setErrors(propertyErrors);
  }, [instanceRef, property, validator, value]);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  return <AppRow>
        <AppToolbar>
            <AppButtons slot='start'>
                <AppLabel color={inputStatusColor}>
                    {propertyFormattedName}
                </AppLabel>
            </AppButtons>
            <AppButtons>
                {value && value.map((val, i) => {
          return <AppChip key={i}>
                        {val.hasOwnProperty("id") && val["id"]}
                        {val.hasOwnProperty("type") && val["type"]}
                        {val.hasOwnProperty("name") && val["name"]}
                        {val.hasOwnProperty("value") && val["value"]}
                        {val.hasOwnProperty("text") && val["text"]}
                    </AppChip>;
        })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => {
          if (typeof value === "undefined") {
            setValue([]);
          }

          ;
          setIsInsertingItem(true);
        }} fill='outline' color={"primary"}>
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <FormComposer validator={validator.makeReferenceValidator(propertyInfo)} data={{}} onSubmit={item => {
            setValue([...value, item]);
            setIsInsertingItem(false);
          }}>
                        <AppBackButton onClick={() => setIsInsertingItem(false)} />
                    </FormComposer>}
                </AppContent>
            </AppModal>
        </AppToolbar>
        {errors && errors.length > 0 && <AppItem>

            <AppLabel position='stacked' color='danger'>
                {errors.map(error => <AppText>
                    {error.message}
                </AppText>)}
            </AppLabel>
        </AppItem>}
    </AppRow>;
};

export default AppFormArrayInput;