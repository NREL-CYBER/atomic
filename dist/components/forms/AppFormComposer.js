import { saveOutline } from 'ionicons/icons';
import React, { Fragment, memo, useCallback, useMemo, useRef, useState } from 'react';
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
  const instance = useRef({ ...data
  });
  const handleValidInputReceived = useCallback(property => {}, []);

  const ComposeNestedFormElement = ({
    propertyInfo,
    instanceRef,
    onValid
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
      validator: validator.makeReferenceValidator(propertyInfo),
      onSubmit: e => {
        instanceRef.current[property] = e;
        onValid(property);
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
        validator: validator,
        onValid: handleValidInputReceived,
        key: property
      });
    }

    if ("items" in propertyInfo) {
      return /*#__PURE__*/React.createElement(AppFormArrayInput, {
        onValid: handleValidInputReceived,
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
        validator: validator,
        instanceRef: instanceRef,
        property: property,
        onValid: handleValidInputReceived,
        key: property
      });
    }

    if (propertyType === "object") {
      return /*#__PURE__*/React.createElement(ComposeNestedFormElement, {
        onValid: handleValidInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo
      });
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null);
  };

  const [schemaProperties] = useState(Object.keys({ ...schema.properties
  }));
  const optionalFields = schema.required ? schemaProperties.filter(x => !schema.required.includes(x)) : [];
  const requiredFields = schema.required ? schemaProperties.filter(x => schema.required.includes(x)) : schemaProperties;
  const isValid = validator.validate(instance.current);
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
  }, description ? description : schema.description)), useMemo(() => requiredFields.map(property => {
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
      onValid: handleValidInputReceived,
      validator: validator,
      instanceRef: instance,
      property: property
    });
  }), [handleValidInputReceived, hiddenFields, lockedFields, requiredFields, validator])), /*#__PURE__*/React.createElement(AppList, null, !requiredOnly && optionalFields.length > 0 && "Optional Fields", useMemo(() => optionalFields.map(property => {
    if (lockedFields && lockedFields.includes(property)) return /*#__PURE__*/React.createElement(LockedField, {
      property: property,
      value: instance.current[property]
    });
    if (hiddenFields && hiddenFields.includes(property)) return /*#__PURE__*/React.createElement(Fragment, {
      key: property
    });
    return /*#__PURE__*/React.createElement(FormElement, {
      key: property,
      onValid: handleValidInputReceived,
      validator: validator,
      instanceRef: instance,
      property: property
    });
  }), [handleValidInputReceived, hiddenFields, lockedFields, optionalFields, validator])), /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
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

export default memo(AppFormComposer);