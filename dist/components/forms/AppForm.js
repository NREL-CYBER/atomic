/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppCard, AppChip, AppCol, AppContent, AppFormArrayInput, AppFormInput, AppItem, AppLabel, AppList, AppModal, AppText, AppTitle, AppToolbar, AppUuidGenerator, AppFormSelect } from '..';
import { prettyTitle, titleCase } from '../../util';
import AppFormToggle from '../AppFormToggle';
import AppUploader from '../serialization/AppUploader';
import AppFormDictionaryInput from './AppFormDictionaryInput';
import AppFormInteger from './AppFormInteger';
import AppLastModifiedGenerator from './AppLastModifiedGenerator';
import AppFormSelectArray from '../AppFormSelectArray';
import AppFormDateTimePicker from './AppFormDateTimePicker';

const LockedField = ({
  property,
  value
}) => /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
  slot: "start"
}, /*#__PURE__*/React.createElement(AppLabel, {
  position: "stacked",
  color: "favorite"
}, /*#__PURE__*/React.createElement(AppCol, null, titleCase(property)), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppChip, null, typeof value === "object" ? value.map(x => x) : value)))));

const AppForm = props => {
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
    autoSubmit,
    customComponentMap,
    inlineFields
  } = props;
  const {
    schema
  } = validator;

  if (typeof schema.type === "undefined") {
    // eslint-disable-next-line no-throw-literal
    throw "Schema must have a type";
  }

  const instance = useRef(schema.type === "object" ? { ...data
  } : schema.type === "array" ? [...data] : undefined);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleInputReceived = useCallback((property, value) => {
    if (schema.type === "string" || schema.type === "array") {
      instance.current = value;
    } else if (schema.type === "object") {
      instance.current = { ...instance.current,
        [property]: value === "" ? undefined : value
      };
      const calculateProperties = calculatedFields && calculatedFields.map[property];

      if (calculateProperties) {
        const calculatedFieldValue = calculateProperties({
          property,
          value
        });

        if (calculatedFieldValue.value) {
          instance.current = { ...instance.current,
            [calculatedFieldValue.property]: calculatedFieldValue.value
          };
        }
      }
    }

    setIsValid(validator.validate(instance.current));
    const allErrors = validator.validate.errors || [];
    const propertyErrors = allErrors.filter(error => error.schemaPath === "#/" + property).map(x => x.message || "");
    setErrors(allErrors.map(x => x.dataPath.split("#").join("").split("/").join("") + " " + x.message || ""));

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
    customComponentMap,
    propertyInfo,
    property,
    inline,
    instanceRef,
    onChange
  }) => {
    const {
      title
    } = propertyInfo;
    const [showNestedForm, setShowNestedFrom] = useState(false);
    const [nestedFormStatus, setNestedFormStatus] = useState("empty");
    const formated_title = titleCase((property || title || '').split("_").join(" "));
    return inline ? /*#__PURE__*/React.createElement(AppForm, {
      data: instanceRef.current[property],
      validator: validator.makeReferenceValidator(propertyInfo),
      requiredOnly: requiredOnly,
      autoSubmit: true,
      customComponentMap: customComponentMap,
      onSubmit: nestedObjectValue => {
        setNestedFormStatus("valid");
        onChange(property, nestedObjectValue);
        setShowNestedFrom(false);
      }
    }) : /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(AppButton, {
      color: nestedFormStatus === "valid" ? "success" : "primary",
      fill: "outline",
      onClick: () => setShowNestedFrom(x => !x)
    }, formated_title)), /*#__PURE__*/React.createElement(AppModal, {
      onDismiss: () => setShowNestedFrom(false),
      isOpen: showNestedForm
    }, /*#__PURE__*/React.createElement(AppContent, null, showNestedForm && /*#__PURE__*/React.createElement(AppForm, {
      data: instanceRef.current[property],
      customComponentMap: customComponentMap,
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
    const propertyFormat = propertyInfo.format ? propertyInfo.format : refPropertyInfo["format"];

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

    if (propertyInfo["contentMediaType"]) {
      return /*#__PURE__*/React.createElement(AppUploader, {
        accept: propertyInfo["contentMediaType"],
        description: propertyInfo.description || "",
        title: propertyInfo.title || property,
        onFileReceived: (meta, uri) => {
          handleInputReceived(property, uri);
        }
      });
    }

    if (customComponentMap && customComponentMap[property]) {
      return customComponentMap[property]({
        instanceRef,
        customComponentMap,
        onChange: handleInputReceived,
        property,
        propertyInfo,
        children
      });
    }

    if ("enum" in propertyInfo) {
      if (propertyInfo["type"] === "array") {
        return /*#__PURE__*/React.createElement(AppFormSelectArray, {
          instanceRef: instanceRef,
          propertyInfo: propertyInfo,
          property: property,
          onChange: handleInputReceived,
          key: property
        });
      } else {
        return /*#__PURE__*/React.createElement(AppFormSelect, {
          instanceRef: instanceRef,
          propertyInfo: propertyInfo,
          property: property,
          onChange: handleInputReceived,
          key: property
        });
      }
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

    if (propertyType === "string" && propertyFormat && propertyFormat.includes("date")) {
      return /*#__PURE__*/React.createElement(AppFormDateTimePicker, {
        format: propertyFormat,
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "integer" || propertyType === "number") {
      return /*#__PURE__*/React.createElement(AppFormInteger, {
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
        customComponentMap: customComponentMap,
        validator: validator.makeReferenceValidator(propertyInfo),
        key: property
      });
    }

    if (propertyType === "object" && !propertyInfo.properties && propertyInfo.additionalProperties && propertyInfo.additionalProperties.allOf) {
      return /*#__PURE__*/React.createElement(AppFormDictionaryInput, {
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        customComponentMap: customComponentMap,
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
        inline: inlineFields && inlineFields.includes(property),
        onChange: handleInputReceived,
        customComponentMap: customComponentMap,
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
  const optionalFields = (!requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : []).filter(o => showFields ? !showFields.includes(o) : true);
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
  })); // eslint-disable-next-line react-hooks/exhaustive-deps


  const OptionalFormFields = () => /*#__PURE__*/React.createElement(React.Fragment, null, optionalFields.map(property => {
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
      color: "clear"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, children, /*#__PURE__*/React.createElement(AppTitle, {
      color: isValid ? "favorite" : "tertiary"
    }, prettyTitle(title || schema.title)))))
  }, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, description ? description : schema.description)), /*#__PURE__*/React.createElement(AppList, {
    color: "clear"
  }, useMemo(() => /*#__PURE__*/React.createElement(RequiredFormFields, null), []), schema.type === "string" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormInput, {
    propertyInfo: schema,
    property: schema.title || "",
    input: "line",
    instanceRef: instance,
    onChange: handleInputReceived
  }))), /*#__PURE__*/React.createElement(AppList, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear"
  }, !requiredOnly && optionalFields.length > 0 && /*#__PURE__*/React.createElement(AppButton, {
    color: showOptional ? "tertiary" : "primary",
    fill: "outline",
    onClick: () => setShowOptional(x => !x)
  }, !showOptional ? "Enter" : "", " Optional info")), useMemo(() => showOptional ? /*#__PURE__*/React.createElement(OptionalFormFields, null) : /*#__PURE__*/React.createElement(React.Fragment, null), [showOptional])), /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, errors.slice(0, 1).map(error => /*#__PURE__*/React.createElement(AppChip, {
    key: "error",
    color: "danger"
  }, title, " ", error.split('_').join(' '))), useMemo(() => !autoSubmit && isValid ? /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    fill: "solid",
    color: isValid ? "favorite" : "primary",
    onClick: () => {
      onSubmit(instance.current);
    }
  }, !customSubmit ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppTitle, null, "Save ", title)) : customSubmit) : /*#__PURE__*/React.createElement(React.Fragment, null), [autoSubmit, customSubmit, isValid, onSubmit]))));
};

export default AppForm;