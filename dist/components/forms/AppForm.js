/* eslint-disable no-script-url */

/* eslint-disable react-hooks/exhaustive-deps */
import { chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import React, { Fragment, Suspense, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { AppBackButton, AppButton, AppButtons, AppCard, AppChip, AppCol, AppContent, AppFormArrayInput, AppFormInput, AppFormSelect, AppIcon, AppItem, AppLabel, AppList, AppLoadingCard, AppModal, AppText, AppTitle, AppToolbar, AppUuidGenerator } from '..';
import { prettyTitle, titleCase } from '../../util';
import AppFormAnyOfArrayInput from '../AppFormAnyOfArrayInput';
import AppFormSelectArray from '../AppFormSelectArray';
import AppFormToggle from '../AppFormToggle';
import AppUploader from '../serialization/AppUploader';
import { validationCacheWorker } from "./../../workers/validationCacheWorker";
import AppFormDateTimePicker from './AppFormDateTimePicker';
import AppFormDictionaryInput from './AppFormDictionaryInput';
import AppFormInteger from './AppFormInteger';
import AppFormNumber from './AppFormNumber';
import AppLastModifiedGenerator from './AppLastModifiedGenerator';

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
    rootSchema,
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
  const objectSchema = props.objectSchema || props.rootSchema;
  const [deferedValidationPromises, setDefferedValidationResultPromises] = useState({});

  if (typeof objectSchema.type === "undefined") {
    // eslint-disable-next-line no-throw-literal
    throw "Schema must have a type";
  }

  const [schemaProperties] = useState(Object.keys({ ...objectSchema.properties
  }));
  const requiredProperties = objectSchema.required || [];
  const optionalFields = (!requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : []).filter(o => showFields ? !showFields.includes(o) : true);
  let requiredFields = objectSchema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : [];
  requiredFields = showFields ? [...requiredFields, ...showFields.filter(x => schemaProperties.includes(x))] : requiredFields;
  const instance = useRef(objectSchema.type === "object" ? { ...data
  } : objectSchema.type === "array" ? [...data] : undefined);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [optionalStatus, setOptionalStatus] = useState(requiredFields.length === 0 ? "show" : "hidden");

  const toggleOptionalFields = () => {
    switch (optionalStatus) {
      case "hidden":
        setOptionalStatus("show");
        break;

      case "show":
        setOptionalStatus("hidden");
        break;

      default:
        break;
    }
  };

  validationCacheWorker.onmessage = ({
    data
  }) => {
    const allErrors = data.errors || [];
    const uuid = data.uuid;
    const property = data.property;
    const resolve = deferedValidationPromises[uuid];
    setIsValid(allErrors.length === 0);
    const parsedErrors = allErrors.map(x => "" + (x.instancePath.split("/").join("").length > 0 ? "'" + x.instancePath.split("/").join("") + "'" : "'" + x.params?.missingProperty + "'") + " " + x.keyword + " " + x.message);
    const propertyErrors = parsedErrors.filter(x => x.includes("'" + property + "'"));
    const otherErrors = parsedErrors.filter(x => !x.includes("'" + property + "'"));
    setErrors(otherErrors);

    if (allErrors.length === 0) {
      autoSubmit && onSubmit(instance.current);
    }

    if (propertyErrors.length === 0) {
      resolve(["valid", undefined]);
    } else {
      resolve(["invalid", propertyErrors]);
    }
  };

  const handleInputReceived = (property, value) => {
    return new Promise(async resolve => {
      if (objectSchema.type === "string" || objectSchema.type === "array" || objectSchema.type === "number") {
        instance.current = value;
      } else if (objectSchema.type === "object") {
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

      const uuid = v4();
      setDefferedValidationResultPromises(x => ({ ...x,
        [uuid]: resolve
      }));
      validationCacheWorker.postMessage({
        rootSchema,
        objectSchema,
        property,
        value,
        instance,
        uuid
      });
    });
  };

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
    return inline ? /*#__PURE__*/React.createElement(AppFormComposer, {
      data: instanceRef.current[property],
      rootSchema: rootSchema,
      objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
      requiredOnly: requiredOnly,
      autoSubmit: true,
      calculatedFields: calculatedFields,
      hiddenFields: hiddenFields,
      lockedFields: lockedFields,
      showFields: showFields,
      customComponentMap: customComponentMap,
      onSubmit: nestedObjectValue => {
        onChange(property, nestedObjectValue).then(([validationStatus, errors]) => {
          setNestedFormStatus(validationStatus);
          setShowNestedFrom(false);
        });
      }
    }) : /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(AppButton, {
      color: nestedFormStatus === "valid" ? "success" : "primary",
      fill: "outline",
      onClick: () => setShowNestedFrom(x => !x)
    }, formated_title)), /*#__PURE__*/React.createElement(Suspense, {
      fallback: /*#__PURE__*/React.createElement(React.Fragment, null)
    }, /*#__PURE__*/React.createElement(AppModal, {
      onDismiss: () => setShowNestedFrom(false),
      isOpen: showNestedForm
    }, /*#__PURE__*/React.createElement(AppContent, null, showNestedForm && /*#__PURE__*/React.createElement(AppFormComposer, {
      data: instanceRef.current[property],
      customComponentMap: customComponentMap,
      rootSchema: rootSchema,
      objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
      onSubmit: nestedObjectValue => {
        setNestedFormStatus("valid");
        onChange(property, nestedObjectValue);
        setShowNestedFrom(false);
      }
    }, /*#__PURE__*/React.createElement(AppBackButton, {
      onClick: () => setShowNestedFrom(false)
    }))))));
  };

  const FormElement = ({
    required,
    instanceRef,
    property,
    rootSchema,
    objectSchema,
    propertyInfo
  }) => {
    if (typeof propertyInfo === "undefined") {
      return /*#__PURE__*/React.createElement(React.Fragment, null, "Undefined property... is your JSON schema OK?");
    }

    const refPropertyInfo = findReferenceInformation(rootSchema, objectSchema, property, propertyInfo);
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
    } // Custom component by property name


    if (customComponentMap && customComponentMap[property]) {
      return customComponentMap[property]({
        instanceRef,
        customComponentMap,
        onChange: handleInputReceived,
        property,
        propertyInfo,
        children,
        objectSchema,
        rootSchema
      });
    } // Custom component by property identifier


    if (customComponentMap && propertyInfo.$id && customComponentMap[propertyInfo.$id]) {
      return customComponentMap[propertyInfo.$id]({
        instanceRef,
        customComponentMap,
        onChange: handleInputReceived,
        property,
        propertyInfo,
        children,
        objectSchema,
        rootSchema
      });
    }

    if ("enum" in propertyInfo) {
      if (propertyInfo["type"] === "array") {
        return /*#__PURE__*/React.createElement(AppFormSelectArray, {
          rootSchema: rootSchema,
          objectSchema: objectSchema,
          required: required,
          instanceRef: instanceRef,
          propertyInfo: propertyInfo,
          property: property,
          onChange: handleInputReceived,
          key: property
        });
      } else {
        return /*#__PURE__*/React.createElement(AppFormSelect, {
          required: required,
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
        rootSchema: rootSchema,
        objectSchema: objectSchema,
        required: required,
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "string" && propertyFormat && propertyFormat.includes("date")) {
      return /*#__PURE__*/React.createElement(AppFormDateTimePicker, {
        rootSchema: rootSchema,
        objectSchema: objectSchema,
        format: propertyFormat,
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "integer") {
      return /*#__PURE__*/React.createElement(AppFormInteger, {
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "number") {
      return /*#__PURE__*/React.createElement(AppFormNumber, {
        rootSchema: rootSchema,
        objectSchema: objectSchema,
        required: required,
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "array") {
      return typeof propertyInfo.items?.anyOf === "undefined" ? /*#__PURE__*/React.createElement(AppFormArrayInput, {
        rootSchema: rootSchema,
        required: required,
        objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        hiddenFields: hiddenFields,
        lockedFields: lockedFields,
        showFields: showFields,
        property: property,
        customComponentMap: customComponentMap,
        key: property
      }) : /*#__PURE__*/React.createElement(AppFormAnyOfArrayInput, {
        required: required,
        rootSchema: rootSchema,
        objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        hiddenFields: hiddenFields,
        lockedFields: lockedFields,
        showFields: showFields,
        property: property,
        customComponentMap: customComponentMap,
        key: property
      });
    }

    if (propertyType === "object" && !propertyInfo.properties && propertyInfo.additionalProperties && propertyInfo.additionalProperties.allOf) {
      return /*#__PURE__*/React.createElement(AppFormDictionaryInput, {
        required: required,
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        customComponentMap: customComponentMap,
        propertyInfo: propertyInfo,
        hiddenFields: hiddenFields,
        lockedFields: lockedFields,
        showFields: showFields,
        property: property,
        objectSchema: objectSchema,
        rootSchema: rootSchema,
        key: property
      });
    }

    if (propertyType === "string") {
      return /*#__PURE__*/React.createElement(AppFormInput, {
        objectSchema: objectSchema,
        rootSchema: rootSchema,
        required: required,
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
        objectSchema: objectSchema,
        rootSchema: rootSchema,
        required: required,
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
      propertyInfo: objectSchema.properties && objectSchema.properties[property],
      required: true,
      rootSchema: rootSchema,
      objectSchema: objectSchema,
      key: property,
      onChange: handleInputReceived,
      instanceRef: instance,
      property: property
    });
  }));

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(AppLoadingCard, null)
  }, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
      color: "clear"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, children, /*#__PURE__*/React.createElement(AppTitle, {
      color: isValid ? "favorite" : "tertiary"
    }, prettyTitle(title || objectSchema.title)))))
  }, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, description ? description : objectSchema.description)), /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(AppLoadingCard, null)
  }, /*#__PURE__*/React.createElement(AppList, {
    color: "clear"
  }, useMemo(() => /*#__PURE__*/React.createElement(RequiredFormFields, null), []), objectSchema.type === "string" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormInput, {
    rootSchema: rootSchema,
    objectSchema: objectSchema,
    propertyInfo: objectSchema,
    property: objectSchema.title || "",
    input: "text",
    instanceRef: instance,
    onChange: handleInputReceived
  })), objectSchema.type === "boolean" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormToggle, {
    rootSchema: rootSchema,
    objectSchema: objectSchema,
    propertyInfo: objectSchema,
    property: objectSchema.title || "",
    instanceRef: instance,
    onChange: handleInputReceived
  })), objectSchema.type === "number" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormInteger, {
    propertyInfo: objectSchema,
    property: objectSchema.title || "",
    instanceRef: instance,
    onChange: handleInputReceived
  })))), /*#__PURE__*/React.createElement(AppList, {
    color: "clear"
  }, !requiredOnly && optionalFields.length > 0 && /*#__PURE__*/React.createElement(AppItem, {
    href: 'javascript:void(0)',
    color: "clear",
    onClick: toggleOptionalFields
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: optionalStatus === 'show' ? chevronDownOutline : chevronForwardOutline
  }), /*#__PURE__*/React.createElement(AppTitle, {
    color: "medium"
  }, optionalStatus === "hidden" ? "Enter" : "", " Optional info")), /*#__PURE__*/React.createElement("div", {
    hidden: optionalStatus !== "show"
  }, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(React.Fragment, null)
  }, useMemo(() => optionalFields.map(property => {
    if (lockedFields && lockedFields.includes(property)) return /*#__PURE__*/React.createElement(LockedField, {
      key: property,
      property: property,
      value: instance.current[property]
    });
    if (hiddenFields && hiddenFields.includes(property)) return /*#__PURE__*/React.createElement(Fragment, {
      key: property
    });
    return /*#__PURE__*/React.createElement(FormElement, {
      propertyInfo: objectSchema.properties[property],
      required: false,
      rootSchema: rootSchema,
      objectSchema: objectSchema,
      key: property,
      onChange: handleInputReceived,
      instanceRef: instance,
      property: property
    });
  }), [])))), /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, useMemo(() => errors.slice(0, 1).map(error => /*#__PURE__*/React.createElement(AppChip, {
    key: "error",
    color: "danger"
  }, title, " ", error.split('_').join(' '))), [errors]), useMemo(() => !autoSubmit && isValid ? /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    fill: "solid",
    color: isValid ? "favorite" : "primary",
    onClick: () => {
      onSubmit(instance.current);
    }
  }, !customSubmit ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppTitle, null, "Save ", title)) : customSubmit) : /*#__PURE__*/React.createElement(React.Fragment, null), [autoSubmit, customSubmit, isValid, onSubmit])))));
};

const AppFormComposer = AppForm;
export default AppForm;
export { AppFormComposer };
export function findSubSchema(schema, objectSchema, propertyInfo) {
  const definitions = Object.values(schema.definitions || {});
  const definition_id = propertyInfo.$ref || propertyInfo.items?.$ref;
  const matchingDefinition = definition_id && definitions.find(x => x.$id === definition_id);

  if (matchingDefinition) {
    return matchingDefinition;
  }

  if (propertyInfo.items && typeof propertyInfo.$ref === 'undefined') {
    return propertyInfo.items;
  }

  return propertyInfo;
}
export function findSchemaDefinitionId(schema, propertyInfo) {
  if (propertyInfo.$ref) {
    return propertyInfo.$ref;
  }

  if (propertyInfo.items) {
    return propertyInfo.items.$ref;
  }

  return propertyInfo.$id;
}
export function findSchemaDefinition(schema, definition) {
  return schema.definitions[definition];
}
export function findReferenceInformation(rootSchema, objectSchema, property, propInfo) {
  if (typeof propInfo.$id === 'undefined' && typeof propInfo.$ref === 'undefined' && typeof propInfo.allOf === 'undefined' && typeof propInfo.anyOf === 'undefined') {
    return propInfo;
  }

  if (propInfo.items) {
    if (propInfo.items.$ref) {
      return findSubSchema(rootSchema, objectSchema, propInfo);
    }

    return propInfo;
  }

  if (propInfo.$ref) {
    return findSubSchema(rootSchema, objectSchema, propInfo);
  }

  return propInfo;
}