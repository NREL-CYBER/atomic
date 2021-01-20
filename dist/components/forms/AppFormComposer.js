import { saveOutline } from 'ionicons/icons';
import cloneDeep from "lodash/cloneDeep";
import React, { Fragment, useCallback, useRef, useState, useMemo } from 'react';
import { AppBackButton, AppButton, AppButtons, AppCard, AppChip, AppCol, AppContent, AppFormArrayInput, AppFormInput, AppFormSelect, AppIcon, AppItem, AppLabel, AppList, AppModal, AppRow, AppText, AppTitle, AppToolbar, AppUuidGenerator } from '..';
import { titleCase } from '../../util';

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
    requiredOnly
  } = props;
  const {
    schema
  } = validator;
  const [subValidator] = useState(cloneDeep(validator));
  const instance = useRef({ ...data
  });
  const [isValid, setIsValid] = useState(false);
  const handleInputReceived = useCallback((property, value) => {
    console.log(property, "changed");
    const change = {};
    change[property] = value === "" ? undefined : value;
    instance.current = { ...instance.current,
      ...change
    };
    setIsValid(validator.validate(instance.current));
    const allErrors = validator.validate.errors || [];
    const propertyErrors = allErrors.map(error => typeof error.message === "string" ? error.message : "").filter(errorMessage => errorMessage.includes(property));

    if (propertyErrors.length === 0) {
      return ["valid", undefined];
    } else {
      return ["invalid", propertyErrors];
    }
  }, [validator]);

  const ComposeNestedFormElement = ({
    propertyInfo,
    instanceRef,
    onChange
  }) => {
    const {
      property
    } = propertyInfo;
    const [showNestedForm, setShowNestedFrom] = useState(false);
    return /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppButton, {
      fill: "outline",
      onClick: () => setShowNestedFrom(x => !x)
    }, propertyInfo.property), /*#__PURE__*/React.createElement(AppModal, {
      onDismiss: () => setShowNestedFrom(false),
      isOpen: showNestedForm
    }, /*#__PURE__*/React.createElement(AppContent, null, showNestedForm && /*#__PURE__*/React.createElement(AppFormComposer, {
      data: { ...instanceRef.current[property]
      },
      validator: subValidator.makeReferenceValidator(propertyInfo),
      onSubmit: nestedObjectValue => {
        const [validationStatus, validationErrors] = onChange(property, nestedObjectValue);
        console.log(validationStatus);
        setShowNestedFrom(false);
      }
    }, /*#__PURE__*/React.createElement(AppBackButton, {
      onClick: () => setShowNestedFrom(false)
    })))));
  };

  const FormElement = props => {
    const {
      instanceRef,
      property,
      validator
    } = props;
    let propertyInfo = schema.properties && schema.properties[property];

    if (typeof propertyInfo === "undefined") {
      throw new Error("Undefined property... is your JSON schema OK?");
    }

    propertyInfo = { ...propertyInfo,
      ...validator.getReferenceInformation(propertyInfo)
    };
    const propertyType = propertyInfo["type"] || "object";

    if (property === "uuid") {
      return /*#__PURE__*/React.createElement(AppUuidGenerator, {
        validator: validator,
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

    if ("items" in propertyInfo) {
      return /*#__PURE__*/React.createElement(AppFormArrayInput, {
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        property: property,
        validator: validator,
        key: property
      });
    }

    if (propertyType === "string") {
      return /*#__PURE__*/React.createElement(AppFormInput, {
        input: "text",
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
        propertyInfo: propertyInfo
      });
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null);
  };

  const [schemaProperties] = useState(Object.keys({ ...schema.properties
  }));
  const optionalFields = schema.required ? schemaProperties.filter(x => !schema.required.includes(x)) : [];
  const requiredFields = schema.required ? schemaProperties.filter(x => schema.required.includes(x)) : [];

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
      validator: subValidator,
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
      validator: subValidator,
      instanceRef: instance,
      property: property
    });
  }));

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppCard, {
    title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
      color: "light"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, children, /*#__PURE__*/React.createElement(AppTitle, {
      color: isValid ? "favorite" : "tertiary"
    }, title ? title : titleCase(schema.title || "")))))
  }, /*#__PURE__*/React.createElement(AppList, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, description ? description : schema.description)), useMemo(() => /*#__PURE__*/React.createElement(RequiredFormFields, null), [])), /*#__PURE__*/React.createElement(AppList, null, !requiredOnly && optionalFields.length > 0 && "Optional Fields", useMemo(() => /*#__PURE__*/React.createElement(OptionalFormFields, null), [])), /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "solid",
    color: isValid ? "favorite" : "primary",
    disabled: !isValid,
    onClick: () => {
      onSubmit(instance.current);
    }
  }, /*#__PURE__*/React.createElement(AppLabel, null, "Save"), /*#__PURE__*/React.createElement(AppIcon, {
    icon: saveOutline
  }))))));
};

export default AppFormComposer;