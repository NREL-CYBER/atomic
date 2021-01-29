import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useState } from 'react';
import Validator from 'validator';
import { AppSpinner } from '.';
import useFirebaseStorage from '../hooks/useFirebaseSerialization';
import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppSelectButtons from './AppSelectButtons';
import AppFormComposer from './forms/AppFormComposer';
const credentialSchema = {
  "$id": "user",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Please Enter your Username and Password",
  "title": "Account",
  "$comment": "~",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "writeOnly": true
    }
  },
  "required": ["email", "password"]
};
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
    selected: [],
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
    customSubmit: /*#__PURE__*/React.createElement(React.Fragment, null, status),
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