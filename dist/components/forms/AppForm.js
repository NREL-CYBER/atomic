/* eslint-disable no-script-url */

/* eslint-disable react-hooks/exhaustive-deps */
import { chevronDownOutline, chevronForwardOutline, pencilOutline } from 'ionicons/icons';
import React, { Fragment, Suspense, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { AppBackButton, AppButton, AppButtons, AppCard, AppChip, AppCol, AppFormArrayInput, AppFormInput, AppFormSelect, AppIcon, AppItem, AppLabel, AppList, AppLoadingCard, AppModal, AppText, AppTitle, AppToolbar, AppUuidGenerator } from '..';
import { isNull, prettyTitle, titleCase } from '../../util';
import AppFormAnyOfArrayInput from '../AppFormAnyOfArrayInput';
import { inputStatusColorMap } from '../AppFormInput';
import AppFormSelectArray from '../AppFormSelectArray';
import AppFormToggle from '../AppFormToggle';
import { VisualizeValue } from '../AppJsonDisplay';
import AppUploader from '../serialization/AppUploader';
import { validationCacheWorker } from "./../../workers/validationCacheWorker";
import AppFormDateTimePicker from './AppFormDateTimePicker';
import AppFormDictionaryInput from './AppFormDictionaryInput';
import AppFormInteger from './AppFormInteger';
import { AppFormLabel } from './AppFormLabel';
import AppFormNumber, { AppFormNumberRange } from './AppFormNumber';
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
    dependencyMap,
    customSubmit,
    autoSubmit,
    customInputMap,
    customRenderMap,
    inlineFields,
    hideTitle,
    context
  } = props;
  let objectSchema = props.objectSchema || props.rootSchema;
  const [deferedValidationPromises, setDefferedValidationResultPromises] = useState({});

  if (typeof objectSchema.type === "undefined") {
    objectSchema = findSubSchema(rootSchema, objectSchema, { ...objectSchema
    });

    if (typeof objectSchema.type === "undefined") {
      // eslint-disable-next-line no-throw-literal
      throw "Schema must have a type";
    }
  }

  const [schemaProperties] = useState(Object.keys({ ...objectSchema.properties
  }));
  const [reRenderDependents, setReRenderDependents] = useState(0);
  const requiredProperties = objectSchema.required || [];
  const dependentFields = Object.values({ ...objectSchema.dependentRequired,
    ...dependencyMap
  }).flatMap(x => x).filter(y => schemaProperties.includes(y));
  const triggeringFields = Object.keys({ ...objectSchema.dependentRequired,
    ...dependencyMap
  });
  const optionalFields = (!requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : []).filter(o => showFields ? !showFields.includes(o) : true).filter(x => !dependentFields.includes(x));
  let requiredFields = objectSchema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : [];
  requiredFields = (showFields ? [...requiredFields, ...showFields.filter(x => schemaProperties.includes(x))] : requiredFields).filter(x => !dependentFields.includes(x));
  const instance = useRef(objectSchema.type === "object" ? { ...(data ? data : {})
  } : objectSchema.type === "array" ? [...(Array.isArray(data) ? data : [])] : undefined);
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
    console.log(allErrors);
    const parsedErrors = allErrors.map(x => "" + (x.instancePath.split("/").join("").length > 0 ? "'" + x.instancePath.split("/").join("") + "'" : "'" + x.params && x.params.missingProperty + "'") + " " + x.keyword + " " + x.message);
    const propertyErrors = parsedErrors.filter(x => x.includes("'" + property + "'"));
    const otherErrors = parsedErrors.filter(x => !x.includes("'" + property + "'"));
    setErrors(otherErrors);

    if (allErrors.length === 0) {
      autoSubmit && onSubmit(instance.current);
    }

    if (propertyErrors.length === 0) {
      resolve && resolve(["valid", undefined]);
    } else {
      resolve && resolve(["invalid", propertyErrors]);
    }
  };

  const handleInputReceived = (property, value) => {
    return new Promise(async resolve => {
      console.log(value);

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

      if (typeof value === "undefined" || isNull(value)) {
        delete instance.current[property];
      }

      if (triggeringFields.includes(property)) {
        setReRenderDependents(x => x + 1);
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
    required,
    customInputMap,
    propertyInfo,
    property,
    inline,
    instanceRef,
    onChange,
    context
  }) => {
    const {
      title
    } = propertyInfo;
    const [showNestedForm, setShowNestedFrom] = useState(false);
    const [nestedFormStatus, setNestedFormStatus] = useState(typeof instanceRef.current[property] === "undefined" ? "empty" : "valid");
    const nestedFormColor = inputStatusColorMap[nestedFormStatus];
    const [NestedFormVisual, setVisual] = useState(VisualizeValue({
      customRenderMap,
      value: { ...instanceRef.current[property]
      },
      propertyInfo
    }));
    const formated_title = titleCase((property || title || '').split("_").join(" "));
    return inline ? /*#__PURE__*/React.createElement(AppForm, {
      customRenderMap: customRenderMap,
      data: instanceRef.current[property],
      rootSchema: rootSchema,
      objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
      requiredOnly: requiredOnly,
      autoSubmit: true,
      dependencyMap: dependencyMap,
      calculatedFields: calculatedFields,
      hiddenFields: hiddenFields,
      lockedFields: lockedFields,
      showFields: showFields,
      customInputMap: customInputMap,
      context: context,
      onSubmit: nestedObjectValue => {
        setVisual(VisualizeValue({
          customRenderMap,
          value: nestedObjectValue,
          propertyInfo
        }));
        onChange(property, nestedObjectValue).then(([validationStatus, errors]) => {
          setNestedFormStatus(validationStatus);
          setShowNestedFrom(false);
        });
      }
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
      onClick: e => {
        const className = e.target.className;
        console.log(e.target.nodeName);

        if (typeof className === "undefined" || e.target.nodeName === "svg") {
          console.log("OK");
          return;
        } else {
          console.log("NOT OK");
        }

        setShowNestedFrom(x => !x);
      }
    }, /*#__PURE__*/React.createElement(AppFormLabel, {
      name: formated_title,
      required: required,
      color: nestedFormColor
    }), typeof NestedFormVisual !== "string" && NestedFormVisual, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppButton, {
      fill: "clear",
      color: "primary"
    }, /*#__PURE__*/React.createElement(AppIcon, {
      icon: pencilOutline
    })))), /*#__PURE__*/React.createElement(Suspense, {
      fallback: /*#__PURE__*/React.createElement(React.Fragment, null)
    }, /*#__PURE__*/React.createElement(AppModal, {
      onDismiss: () => setShowNestedFrom(false),
      isOpen: showNestedForm
    }, showNestedForm && /*#__PURE__*/React.createElement(AppForm, {
      data: instanceRef.current[property],
      customInputMap: customInputMap,
      rootSchema: rootSchema,
      context: context,
      dependencyMap: dependencyMap,
      objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
      onSubmit: nestedObjectValue => {
        setNestedFormStatus("valid");
        setVisual( /*#__PURE__*/React.createElement(VisualizeValue, {
          customRenderMap: customRenderMap,
          value: nestedObjectValue,
          propertyInfo: propertyInfo
        }));
        onChange(property, nestedObjectValue);
        setShowNestedFrom(false);
      }
    }, /*#__PURE__*/React.createElement(AppBackButton, {
      onClick: () => setShowNestedFrom(false)
    })))));
  };

  const FormElement = ({
    required,
    instanceRef,
    property,
    rootSchema,
    objectSchema,
    propertyInfo,
    context
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
        required: required,
        accept: propertyInfo["contentMediaType"],
        description: propertyInfo.description || "",
        title: propertyInfo.title || property,
        onFileReceived: (meta, uri) => {
          handleInputReceived(property, uri);
        }
      });
    } // Custom component by property name


    if (customInputMap && customInputMap[property]) {
      return customInputMap[property]({
        instanceRef,
        customInputMap,
        onChange: handleInputReceived,
        context,
        property,
        propertyInfo,
        children,
        objectSchema,
        rootSchema
      });
    } // Custom component by property identifier


    if (customInputMap && propertyInfo.$id && customInputMap[propertyInfo.$id]) {
      return customInputMap[propertyInfo.$id]({
        instanceRef,
        customInputMap,
        onChange: handleInputReceived,
        context,
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
          context: context,
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
          context: context,
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
        required: required,
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
        required: required,
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      });
    }

    if (propertyType === "number") {
      return propertyType.minimum && propertyType.maximum ? /*#__PURE__*/React.createElement(AppFormNumberRange, {
        rootSchema: rootSchema,
        objectSchema: objectSchema,
        required: required,
        instanceRef: instanceRef,
        propertyInfo: refPropertyInfo,
        property: property,
        onChange: handleInputReceived,
        key: property
      }) : /*#__PURE__*/React.createElement(AppFormNumber, {
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
      var _propertyInfo$items;

      return typeof ((_propertyInfo$items = propertyInfo.items) === null || _propertyInfo$items === void 0 ? void 0 : _propertyInfo$items.anyOf) === "undefined" ? /*#__PURE__*/React.createElement(AppFormArrayInput, {
        rootSchema: rootSchema,
        required: required,
        objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
        onChange: handleInputReceived,
        dependencyMap: dependencyMap,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        hiddenFields: hiddenFields,
        lockedFields: lockedFields,
        showFields: showFields,
        context: context,
        property: property,
        customInputMap: customInputMap,
        key: property
      }) : /*#__PURE__*/React.createElement(AppFormAnyOfArrayInput, {
        required: required,
        context: context,
        rootSchema: rootSchema,
        objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        propertyInfo: propertyInfo,
        hiddenFields: hiddenFields,
        lockedFields: lockedFields,
        showFields: showFields,
        property: property,
        customInputMap: customInputMap,
        key: property
      });
    }

    if (propertyType === "object" && !propertyInfo.properties && propertyInfo.additionalProperties && propertyInfo.additionalProperties.allOf) {
      return /*#__PURE__*/React.createElement(AppFormDictionaryInput, {
        required: required,
        onChange: handleInputReceived,
        instanceRef: instanceRef,
        context: context,
        customInputMap: customInputMap,
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
        context: context,
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
        context: context,
        required: required,
        inline: inlineFields && inlineFields.includes(property),
        onChange: handleInputReceived,
        customInputMap: customInputMap,
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
      required: showFields ? !(showFields !== null && showFields !== void 0 && showFields.includes(property)) : true,
      context: context,
      rootSchema: rootSchema,
      objectSchema: objectSchema,
      key: property,
      onChange: handleInputReceived,
      instanceRef: instance,
      property: property
    });
  }));

  const DependentFormFields = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, dependentFields.map(property => {
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
        context: context,
        rootSchema: rootSchema,
        objectSchema: objectSchema,
        key: property,
        onChange: handleInputReceived,
        instanceRef: instance,
        property: property
      });
    }));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(AppLoadingCard, null)
  }, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    title: !hideTitle ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
      color: "clear"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, children, /*#__PURE__*/React.createElement(AppTitle, {
      color: isValid ? "favorite" : "tertiary"
    }, prettyTitle(title || objectSchema.title))))) : /*#__PURE__*/React.createElement(React.Fragment, null)
  }, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, description ? description : objectSchema.description)), /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(AppLoadingCard, null)
  }, /*#__PURE__*/React.createElement(AppList, {
    color: "clear"
  }, useMemo(() => /*#__PURE__*/React.createElement(RequiredFormFields, null), []), useMemo(() => /*#__PURE__*/React.createElement(DependentFormFields, null), [reRenderDependents]), objectSchema.type === "string" ? typeof objectSchema['enum'] === "undefined" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormInput, {
    rootSchema: rootSchema,
    objectSchema: objectSchema,
    context: context,
    propertyInfo: objectSchema,
    property: objectSchema.title || "",
    input: "text",
    instanceRef: instance,
    onChange: handleInputReceived
  })) : /*#__PURE__*/React.createElement(AppFormSelect, {
    propertyInfo: objectSchema,
    required: true,
    context: context,
    property: objectSchema.title || "",
    instanceRef: instance,
    onChange: handleInputReceived
  }) : /*#__PURE__*/React.createElement(React.Fragment, null), objectSchema.type === "boolean" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppFormToggle, {
    context: context,
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

export default AppForm;
export function findSubSchema(schema, objectSchema, propertyInfo) {
  var _propertyInfo$items2;

  const definitions = Object.values(schema.definitions || {});
  const definition_id = propertyInfo.$ref || ((_propertyInfo$items2 = propertyInfo.items) === null || _propertyInfo$items2 === void 0 ? void 0 : _propertyInfo$items2.$ref);
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