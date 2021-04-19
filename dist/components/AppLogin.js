import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useState } from 'react';
import Validator from 'validator';
import { AppTitle } from '.';
import { useNotifications } from '../hooks'; //import useFirebaseStorage from '../hooks/useFirebaseSerialization';

import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppItemDivider from './AppItemDivider';
import AppProgress from './AppProgress';
import AppSelectButtons from './AppSelectButtons';
import AppForm from './forms/AppForm';
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
  authenticate
}) => {
  const [status, setStatus] = useState("idle"); //    const cloudSerializer = useFirebaseStorage(cloud)
  //    const { authenticate } = cloudSerializer();

  const {
    post
  } = useNotifications();
  const [validator] = useState(new Validator(credentialSchema));
  return /*#__PURE__*/React.createElement(AppCard, {
    titleColor: "medium",
    title: "Please Authenticate"
  }, /*#__PURE__*/React.createElement(AppItemDivider, null), "     ", status === "idle" && /*#__PURE__*/React.createElement(AppSelectButtons, {
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
      value: "login",
      fill: 'solid'
    }, {
      text: "Sign up",
      value: "create",
      fill: "solid"
    }]
  }), status !== "idle" && status !== "authenticating" && /*#__PURE__*/React.createElement(AppForm, {
    customSubmit: /*#__PURE__*/React.createElement(React.Fragment, null, status),
    title: "Account " + status,
    data: {},
    validator: validator,
    onSubmit: ({
      email,
      password
    }) => {
      setStatus("authenticating");
      authenticate(email, password, status, result => {
        if (typeof result !== "undefined") {
          onLoginSuccess(result);
        } else {
          post({
            color: "danger",
            id: "login-failure",
            message: "Failed to Authenticate"
          });
          setStatus("idle");
        }
      });
    }
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => setStatus("idle")
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowBackOutline
  }))), status === "authenticating" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppTitle, {
    color: "tertiary"
  }, "Authenticating"), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppProgress, {
    type: "indeterminate",
    color: "tertiary"
  })));
};

export default /*#__PURE__*/memo(AppLogin);