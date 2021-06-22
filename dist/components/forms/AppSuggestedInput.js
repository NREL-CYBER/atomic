/* eslint-disable react-hooks/rules-of-hooks */
import { IonButton, IonInput, IonItem, IonList, useIonPopover } from '@ionic/react';
import { prettyTitle, unique } from 'atomic';
import { caretDown } from 'ionicons/icons';
import React, { useRef } from 'react';
import { AppIcon, AppRow } from '..';

/**
 * Component for text input
 */
const AppSuggestedInput = ({
  value,
  values,
  id,
  color,
  onInputChange,
  placeholder,
  type
}) => {
  const inputRef = useRef(null);

  const PopoverList = ({
    onHide
  }) => {
    inputRef?.current?.setFocus();
    return /*#__PURE__*/React.createElement(IonList, null, unique(value ? [value, ...values] : values).map(option => /*#__PURE__*/React.createElement(IonItem, {
      key: option,
      onClick: () => {
        dismiss();
        setTimeout(() => {
          onInputChange(option);
        }, 100);
      },
      button: true
    }, prettyTitle(option))));
  };

  const [present, dismiss] = useIonPopover(PopoverList, {
    showBackdrop: false,
    onHide: () => dismiss()
  });
  return /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(IonInput, {
    type: type,
    placeholder: placeholder,
    color: color,
    ref: inputRef,
    id: id,
    autofocus: true,
    value: value,
    enterkeyhint: "done",
    onIonChange: ({
      detail
    }) => {
      onInputChange(detail.value);
    }
  }), /*#__PURE__*/React.createElement(IonButton, {
    color: color,
    fill: "clear",
    onClick: e => {
      present({
        event: e.nativeEvent
      });
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: caretDown
  })));
};

export default AppSuggestedInput;