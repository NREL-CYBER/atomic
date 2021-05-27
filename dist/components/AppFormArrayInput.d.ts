import React, { MutableRefObject } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
import { formFieldChangeEvent, nestedFormProps } from './forms/AppForm';
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
    customTitleFunction?: (value: any) => string;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
}
export declare const findShortestValue: (val: any) => string;
/**
 * Component for input that displays validation errors
 */
declare const AppFormArrayInput: (props: formInputProps<unknown>) => JSX.Element;
export default AppFormArrayInput;
