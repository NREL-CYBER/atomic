function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState } from "react";
import { AppLoadingCard } from "..";
import AppForm from "./AppForm";
import useappFormDefinitionValidatorCache from "./useAppFormDefinitionCache";
/**
 * 
 *  Compose a form from a Promise of a validator.
 * @param options:{
    data: any,  the data that already is in the form, Note if you change this outside the form, it will not update
    onSubmit: (validData: any) => void, this will only be called if the form input passes validation, you don't have to validate again
    children?: ReactFragment, for custom components in the top lefthand part of the form (backButton)
    lockedFields?: string[]  display Locked fields as a chip that is not editable
    hiddenFields?: string[]  hide these fields from display
    inlineFields?: string[]  inline fields that would normally bring up a nested modal form
    calculatedFields?: calculatedPropertyMap // calculate fields on data-change
    description?: string to override the definition or schema description if there is one
    title?: string to override the definition or schema description if there is one
    requiredOnly?: boolean
    showFields?: string[]
    autoSubmit?: boolean
    customSubmit?: ReactFragment
    customComponentMap?: Record<string, React.FC<nestedFormProps>>
 }
 */

const AppFormComposer = ({
  lazyLoadValidator,
  definition,
  ...props
}) => {
  const [validator, setValidator] = useState();
  const [status, setStatus] = useState("loading");
  const {
    lazyLoadDefinitionValidator
  } = useappFormDefinitionValidatorCache(); // This hook voodoo caches validators by definition & id
  // ideally, we should pre-compile validators and inject them into the store for better performance.
  // this works for now....

  useEffect(() => {
    if (status !== "loading") {
      return;
    }

    lazyLoadValidator().then(warmValidator => {
      console.log("LOaded validator");

      if (typeof definition !== "undefined") {
        lazyLoadDefinitionValidator(warmValidator, definition).then(warmDefinitionValidator => {
          setStatus("idle");
          setValidator(warmDefinitionValidator);
        });
      } else {
        setStatus("idle");
        setValidator(warmValidator);
      }
    }).catch(() => {
      setStatus("error");
    });
  }, [definition, lazyLoadDefinitionValidator, lazyLoadValidator, status, validator]);
  return typeof validator == "undefined" ? /*#__PURE__*/React.createElement(AppLoadingCard, null) : /*#__PURE__*/React.createElement(AppForm, _extends({
    validator: validator
  }, props));
};

export default AppFormComposer;