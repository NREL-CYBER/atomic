import { IonTextarea } from '@ionic/react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Component to display text with optional color
 */
const AppTextArea = props => {
  let {
    onLoseFocus,
    onTextChange
  } = props;

  if (typeof onLoseFocus === 'undefined') {
    onLoseFocus = () => {
      console.log("unhandled focus event");
    };
  }

  const handleKeyUp = useDebouncedCallback(onLoseFocus, 1000).callback;
  const handleChange = onTextChange ? val => onTextChange(val) : val => {
    console.log("unhandled change event");
  };
  return <IonTextarea onKeyUp={handleKeyUp} onIonChange={event => {
    handleChange(event.detail.value);
  }} {...props} />;
};

export default AppTextArea;