import React, { useState, memo } from 'react';
import Validator from 'validator';
import credentialSchema from '../schemas/credential.schema.json';
import AppCard from './AppCard';
import AppSelectButtons from './AppSelectButtons';
import AppFormComposer from './forms/AppFormComposer';
import useFirebaseStorage from '../hooks/useFirebaseSerialization';
import { AppSpinner } from '.';
import AppButton from './AppButton';
import AppIcon from './AppIcon';
import { arrowBackOutline } from 'ionicons/icons';
;
/**
 * Component to show a loading overlay on the application
 */

const AppLogin = ({
  onLoginSuccess,
  cloud
}) => {
  const [status, setStatus] = useState("idle");
  const cloudSerializer = useFirebaseStorage(cloud);
  const {
    authenticate
  } = cloudSerializer();
  const [validator] = useState(new Validator(credentialSchema));
  return /*#__PURE__*/React.createElement(AppCard, {
    title: "Please Authenticate"
  }, status === "idle" && /*#__PURE__*/React.createElement(AppSelectButtons, {
    onSelectionChange: values => {
      if (values.includes("login")) {
        setStatus("login");
      } else if (values.includes("create")) {
        setStatus("create");
      }
    },
    buttons: [{
      text: "Login",
      value: "login"
    }, {
      text: "Sign up",
      value: "create"
    }]
  }), status !== "idle" && status !== "authenticating" && /*#__PURE__*/React.createElement(AppFormComposer, {
    title: "Account " + status,
    data: {},
    validator: validator,
    onSubmit: ({
      email,
      password
    }) => {
      authenticate(email, password, status, onLoginSuccess);
    }
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => setStatus("idle")
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowBackOutline
  }))), status === "authenticating" && /*#__PURE__*/React.createElement(AppSpinner, null));
};

export default memo(AppLogin);