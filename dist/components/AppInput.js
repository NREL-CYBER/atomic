/* eslint-disable react-hooks/rules-of-hooks */
import { IonInput } from '@ionic/react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Component for text input
 */
const AppInput = props => {
  const {
    onLoseFocus
  } = props;
  const handleKeyUp = onLoseFocus ? useDebouncedCallback(onLoseFocus, 1000).callback : () => {};
  return <IonInput onKeyUp={handleKeyUp} {...props} onIonChange={e => {
    props.onInputChange && props.onInputChange(e.detail.value);
  }} />;
};

export default AppInput;