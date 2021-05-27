import React, { MutableRefObject } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
import { formFieldChangeEvent, nestedFormProps } from './AppForm';
interface formInputProps<T> {
    inline?: boolean;
    property: string;
    propertyInfo: PropertyDefinitionRef;
    instanceRef: MutableRefObject<any>;
    validator: Validator<T>;
    onChange: formFieldChangeEvent;
    showFields?: string[];
    hiddenFields?: string[];
    lockedFields?: string[];
    customTitleFunction?: () => string;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormDictionaryInput: (props: formInputProps<unknown>) => JSX.Element;
export default AppFormDictionaryInput;
