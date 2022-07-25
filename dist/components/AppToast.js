function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import useCompletion from '../hooks/useCompletion';

/**
 * A title component for an Toast item
 */
const AppToast = props => {
  const history = useHistory();
  const {
    path
  } = props;
  const {
    pathStatusColor
  } = useCompletion();
  return /*#__PURE__*/React.createElement(IonToast, _extends({
    color: path ? pathStatusColor(path) : "medium",
    animated: true,
    buttons: props.path ? [{
      text: "Go",
      handler: () => {
        history.push({
          pathname: props.path
        });
      }
    }] : [],
    position: "bottom",
    duration: 3000,
    onDidDismiss: () => {
      props.onDismiss(props.id);
    },
    isOpen: true
  }, props));
};

export default AppToast;