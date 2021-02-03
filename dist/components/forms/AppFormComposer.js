import { saveOutline } from 'ionicons/icons';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppCard, AppChip, AppCol, AppContent, AppFormArrayInput, AppFormInput, AppFormSelect, AppIcon, AppItem, AppLabel, AppList, AppModal, AppText, AppTitle, AppToolbar, AppUuidGenerator } from '..';
import { titleCase } from '../../util';
import AppFormToggle from '../AppFormToggle';
import AppLastModifiedGenerator from './AppLastModifiedGenerator';
import AppFormDictionaryInput from './AppFormDictionaryInput';

const LockedField = ({
  property,
  value
}) => /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
  slot: "start"
}, /*#__PURE__*/React.createElement(AppLabel, {
  position: "stacked",
  color: "favorite"
}, /*#__PURE__*/React.createElement(AppCol, null, titleCase(property)), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppChip, null, typeof value === "object" ? value.map(x => x) : value)))));

const AppFormComposer = props => {
  const {
    validator,
    data,
    onSubmit,
    children,
    lockedFields,
    hiddenFields,
    description,
    title,
    requiredOnly,
    calculatedFields,
    showFields,
    customSubmit,
    autoSubmit
  } = props;
  const {
    schema
  } = validator;
  const instance = useRef(schema.type === "object" ? { ...data
  } : schema.type === "array" ? [...data] : undefined);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleInputReceived = useCallback((property, value) => {
    if (schema.type === "string" || schema.type === "array") {
      instance.current = value;
    } else if (schema.type === "object") {
      instance.current[property] = value === "" ? undefined : value;
      const calculateProperties = calculatedFields && calculatedFields.map[property];

      if (calculateProperties) {
        const calculatedFieldValue = calculateProperties({
          property,
          value
        });
        console.log(calculatedFieldValue); //                instance.current[calculatedFieldValue.property] = calculatedFieldValue.value;
      }
    }

    setIsValid(validator.validate(instance.current));
    const allErrors = validator.validate.errors || [];
    const propertyErrors = allErrors.filter(error => error.dataPath.includes(property)).map(x => x.message || "");
    setErrors(allErrors.map(x => x.schemaPath + " " + x.keyword + " " + x.dataPath + " " + x.message || ""));

    if (allErrors.length === 0) {
      autoSubmit && onSubmit(instance.current);
    }

    if (propertyErrors.length === 0) {
      return ["valid", undefined];
    } else {
      return ["invalid", propertyErrors];
    }
  }, [autoSubmit, calculatedFields, onSubmit, schema.type, validator]);

  const ComposeNestedFormElement = ({
    propertyInfo,
    property,
    instanceRef,
    onChange
  }) => {
    const {
      title
    } = propertyInfo;
    const [showNestedForm, setShowNestedFrom] = useState(false);
    const [nestedFormStatus, setNestedFormStatus] = useState("empty");
    const formated_title = titleCase((property || title || '').split("_").join(" "));
    return /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(AppButton, {
      color: nestedFormStatus === "valid" ? "success" : "primary",
      fill: "outline",
      onClick: () => setShowNestedFrom(x => !x)
    }, formated_title)), /*#__PURE__*/React.createElement(AppModal, {
      onDismiss: () => setShowNestedFrom(false),
      isOpen: showNestedForm
    }, /*#__PURE__*/React.createElement(AppContent, null, showNestedForm && /*#__PURE__*/React.createElement(AppFormComposer, {
      data: instanceRef.current[property],
      validator: validator.makeReferenceValidator(propertyInfo),
      onSubmit: nestedObjectValue => {
        setNestedFormStatus("valid");
        onChange(property, nestedObjectValue);
        setShowNestedFrom(false);
      }
    }, /*#__PURE__*/React.createElement(AppBackButton, {
      onClick: () => setShowNestedFrom(false)
    })))));
  };

  const FormElement = ({
    instanceRef,
    property,
    validator
  }) => {
    const propertyInfo = schema.properties && schema.properties[property];

    if (typeof propertyInfo === "undefined") {
      throw new Error("Undefined property... is your JSON schema OK?");
    }

    const refPropertyInfo = validator.getReferenceInformation(propertyInfo);
    const propertyType = propertyInfo.type ? propertyInfo.type : refPropertyInfo["type"];

    if (property.includes("import")) {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }

    if (property === "uuid") {
      return /*#__PURE__*/React.createElement(AppUuidGenerator, {
        instanceRef: instanceRef
      });
    }

    if (property === "last_modified") {
      return /*#__PURE__*/React.createElement(AppLastModifiedGenerator, {
        instanceRef: instanceRef
      });
    }

    if ("enum" in propertyInfo) {
      return /*#__PURE__*/React.createElement(AppFormSelect, {
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "boolean") {
      return /*#__PURE__*/React.createElement(AppFormToggle, {
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "array") {
      return /*#__PURE__*/React.createElement(AppFormArrayInput, {
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        property: property,
        validator: validator.makeReferenceValidator(propertyInfo),
        key: property
      });
    }

    if (propertyType === "object" && propertyInfo.additionalProperties && propertyInfo.additionalProperties.allOf) {
      return /*#__PURE__*/React.createElement(AppFormDictionaryInput, {
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        property: property,
        validator: validator.makeReferenceValidator(refPropertyInfo),
        key: property
      });
    }

    if (propertyType === "string") {
      return /*#__PURE__*/React.createElement(AppFormInput, {
        input: "text",
        propertyInfo: propertyInfo,
        instanceRef: instanceRef,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "object") {
      return /*#__PURE__*/React.createElement(ComposeNestedFormElement, {
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        property: property,
        propertyInfo: propertyInfo
      });
    }

    return /*#__PURE__*/React.createElement(AppChip, {
      color: "danger"
    }, property);
  };

  const [schemaProperties] = useState(Object.keys({ ...schema.properties
  }));
  const requiredProperties = schema.required || [];
  const optionalFields = !requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : [];
  let requiredFields = schema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : [];
  requiredFields = showFields ? [...requiredFields, ...showFields] : requiredFields;
  const [showOptional, setShowOptional] = useState(false);

  const RequiredFormFields = () => /*#__PURE__*/React.createElement(React.Fragment, null, requiredFields.map(property => {
    if (lockedFields && lockedFields.includes(property)) return /*#__PURE__*/React.createElement(LockedField, {
      key: property,
      property: property,
      value: instance.current[property]
    });
    if (hiddenFields && hiddenFields.includes(property)) return /*#__PURE__*/React.createElement(Fragment, {
      key: property
    });
    return /*#__PURE__*/React.createElement(FormElement, {
      key: property,
      onChange: handleInputReceived,
      validator: validator,
      instanceRef: instance,
      property: property
    });
  }));

  const OptionalFormFields = () => /*#__PURE__*/React.createElement(React.Fragment, null, optionalFields.map(property => {
    if (lockedFields && lockedFields.includes(property)) return /*#__PURE__*/React.createElement(LockedField, {
      property: property,
      value: instance.current[property]
    });
    if (hiddenFields && hiddenFields.includes(property)) return /*#__PURE__*/React.createElement(Fragment, {
      key: property
    });
    return /*#__PURE__*/React.createElement(FormElement, {
      key: property,
      onChange: handleInputReceived,
      validator: validator,
      instanceRef: instance,
      property: property
    });
  }));

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
      color: "clear"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, children, /*#__PURE__*/React.createElement(AppTitle, {
      color: isValid ? "favorite" : "tertiary"
    }, title ? title : titleCase(schema.title || "")))))
  }, /*#__PURE__*/React.createElement(AppList, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, description ? description : schema.description)), useMemo(() => /*#__PURE__*/React.createElement(RequiredFormFields, null), []), schema.type === "string" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormInput, {
    propertyInfo: schema,
    property: schema.title || "",
    input: "line",
    instanceRef: instance,
    onChange: handleInputReceived
  }))), /*#__PURE__*/React.createElement(AppList, {
    color: "tertiary"
  }, !requiredOnly && optionalFields.length > 0 && /*#__PURE__*/React.createElement(AppChip, {
    onClick: () => setShowOptional(x => !x),
    color: "medium"
  }, "Optional Fields"), useMemo(() => showOptional ? /*#__PURE__*/React.createElement(OptionalFormFields, null) : /*#__PURE__*/React.createElement(React.Fragment, null), [showOptional])), /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, errors.slice(0, 1).map(error => /*#__PURE__*/React.createElement(AppText, {
    color: "danger"
  }, error))), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, useMemo(() => !autoSubmit ? /*#__PURE__*/React.createElement(AppButton, {
    fill: "solid",
    color: isValid ? "favorite" : "primary",
    disabled: !isValid,
    onClick: () => {
      onSubmit(instance.current);
    }
  }, !customSubmit ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppLabel, null, "Save"), /*#__PURE__*/React.createElement(AppIcon, {
    icon: saveOutline
  })) : customSubmit) : /*#__PURE__*/React.createElement(React.Fragment, null), [autoSubmit, customSubmit, isValid, onSubmit])))));
};

export default AppFormComposer;