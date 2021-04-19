function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState } from "react";
import { AppLoadingCard } from "..";
import AppForm from "./AppForm";
import useappFormDefinitionValidatorCache from "./useAppFormDefinitionCache";
/**
 * 
 *  
 */

const AppFormComposer = ({
  lazyLoadValidator,
  definition,
  ...props
}) => {
  const [validator, setValidator] = useState();
  const {
    lazyLoadDefinitionValidator
  } = useappFormDefinitionValidatorCache();
  useEffect(() => {
    lazyLoadValidator().then(warmValidator => {
      if (typeof definition !== "undefined") {
        console.log(warmValidator, "dv");
        lazyLoadDefinitionValidator(warmValidator, definition).then(warmDefinitionValidator => {
          console.log(warmDefinitionValidator, "s");
          setValidator(warmDefinitionValidator);
        });
      } else {
        setValidator(warmValidator);
      }
    });
  }, [definition, lazyLoadDefinitionValidator, lazyLoadValidator, validator]);

  if (typeof validator === "undefined" || typeof validator.schema === "undefined") {
    const title = props.title;
    const loadingtitle = "Loading " + title || " " + definition || "...";
    return /*#__PURE__*/React.createElement(AppLoadingCard, {
      title: loadingtitle,
      message: "Loading.... ",
      color: "favorite"
    });
  } else {
    return /*#__PURE__*/React.createElement(AppForm, _extends({
      validator: validator
    }, props));
  }
};

export default AppFormComposer;