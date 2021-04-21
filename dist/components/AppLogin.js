import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useEffect, useState } from 'react';
import { SHA3 } from 'sha3';
import Validator from 'validator';
import { AppTitle } from '.';
import { useNotifications } from '../hooks';
import { account } from '../hooks/useAppAccount';
import useIndexDBStorage from '../hooks/useLocalSerialization';
import { useRestSerializeation } from '../hooks/useRestSerialization';
import { prettyTitle } from '../util';
import { base64ToHex } from '../util/base64ToHex';
import { byteArrayToBase64 } from '../util/binaryToBase64';
import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppItemDivider from './AppItemDivider';
import AppLoadingCard from './AppLoadingCard';
import AppProgress from './AppProgress';
import AppSelectButtons from './AppSelectButtons';
import AppForm from './forms/AppForm';
const loginFormSchema = {
  "$id": "user",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Please Enter your Email and Password",
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
      "writeOnly": true,
      "minLength": 8
    }
  },
  "required": ["email", "password"]
};
;
/**
 * Sha3 hash then convert to base64 and then to HEX
 * It's a really long string now... there is probably a better solution that is URI safe.
 * @param sensitive 
 */

export const hash_sensitive_info = sensitive => base64ToHex(byteArrayToBase64(new Uint8Array(new SHA3(512).update(sensitive).digest())));
/**
 * Component to show a loading overlay on the application
 */

const AppLogin = ({
  onLoginSuccess,
  authenticate,
  serialization
}) => {
  const [status, setStatus] = useState("booting");
  const synchronizeRest = useRestSerializeation(x => x.synchronize);
  const synchronizeLocal = useIndexDBStorage(x => x.synchronize);
  const {
    post
  } = useNotifications();
  const insertAccount = account.credential(x => x.insert);
  const credentials = account.credential(x => x.all());
  const hasAccounts = credentials.length > 0;
  const accountValidOptions = !hasAccounts ? [{
    text: "Create Account",
    value: "create",
    fill: "solid"
  }] : [{
    text: "New Account",
    value: "create",
    fill: "solid"
  }, {
    text: "Login",
    value: "login",
    fill: 'solid'
  }];
  const [validator] = useState(new Validator(loginFormSchema));
  useEffect(() => {
    if (status === "booting" && typeof serialization !== "undefined") {
      const synchronize = serialization && serialization.mode === "rest" ? synchronizeRest : synchronizeLocal;
      setStatus("synchronizing");
      synchronize(serialization, "account", account.credential.getState, "", () => {
        setStatus("idle");
      });
    }
  }, [serialization, status, synchronizeLocal, synchronizeRest]);

  if (status === "booting" || status === "synchronizing") {
    return /*#__PURE__*/React.createElement(AppLoadingCard, {
      color: "tertiary",
      title: prettyTitle(status),
      message: ""
    });
  }

  return /*#__PURE__*/React.createElement(AppCard, {
    titleColor: "medium",
    title: "Please Authenticate"
  }, /*#__PURE__*/React.createElement(AppItemDivider, null), " ", status === "idle" && /*#__PURE__*/React.createElement(AppSelectButtons, {
    selected: [],
    onSelectionChange: values => {
      if (values.includes("login")) {
        setStatus("login");
      } else if (values.includes("create")) {
        setStatus("create");
      }
    },
    buttons: accountValidOptions
  }), status !== "idle" && status !== "authenticating" && /*#__PURE__*/React.createElement(AppForm, {
    customSubmit: status,
    title: "Account " + status,
    data: {},
    validator: validator,
    onSubmit: ({
      email,
      password
    }) => {
      setStatus("authenticating");
      authenticate(email, password, status, result => {
        if (typeof result === "undefined") {
          post({
            color: "danger",
            id: "login-failure",
            message: "Failed to Authenticate"
          });
          return;
        }

        const entered_credential = {
          uid: hash_sensitive_info(email.toLowerCase()),
          password_hash: hash_sensitive_info(password)
        };
        const existing_credential = credentials.find(x => x.uid === entered_credential.uid);
        const account_exists = typeof existing_credential !== "undefined";

        switch (status) {
          case "create":
            if (!account_exists) insertAccount(entered_credential, entered_credential.uid).then(() => {
              onLoginSuccess(result);
            });else post({
              color: "danger",
              id: "credential-failure",
              message: "Invalid username & Password combination"
            });
            break;

          case "login":
            if (existing_credential && existing_credential.password_hash === entered_credential.password_hash) onLoginSuccess(result);else post({
              color: "danger",
              id: "credential-failure",
              message: "Invalid username & Password combination"
            });
            break;
        }

        setStatus("idle");
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