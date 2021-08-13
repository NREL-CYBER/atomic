/* eslint-disable react-hooks/rules-of-hooks */
import { IonButton, IonInput, IonItem, IonList, useIonPopover } from '@ionic/react';
import { prettyTitle, unique } from 'atomic';
import { caretDown } from 'ionicons/icons';
import React, { useRef } from 'react';
import { AppIcon, AppRow } from '..';
import AppText from '../AppText';

/**
 * Component for text input
 */
const AppSuggestedInput = ({
  value,
  values,
  id,
  color,
  onInputChange,
  onSuggestionSelected,
  placeholder,
  type,
  style
}) => {
  const inputRef = useRef(null);

  const PopoverList = ({
    onHide
  }) => {
    return /*#__PURE__*/React.createElement(IonList, null, unique(values).map(option => /*#__PURE__*/React.createElement(IonItem, {
      key: option,
      onClick: () => {
        dismiss();
        onSuggestionSelected ? onSuggestionSelected(option) : onInputChange(option);
      },
      button: true
    }, /*#__PURE__*/React.createElement(AppText, {
      color: value?.includes(option) ? "success" : "medium"
    }, prettyTitle(option)))));
  };

  const [present, dismiss] = useIonPopover(PopoverList, {
    showBackdrop: false,
    onHide: () => dismiss()
  });
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(IonInput, {
    debounce: 250,
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
  }))));
};

export default AppSuggestedInput;