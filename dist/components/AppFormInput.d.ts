import { MutableRefObject } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { formFieldChangeEvent } from './forms/AppForm';
interface formInputProps<T> {
    propertyInfo: PropertyDefinitionRef;
    property: string;
    instanceRef: MutableRefObject<T>;
    input: "line" | "text" | "array";
    onChange: formFieldChangeEvent;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormInput: (props: formInputProps<any>) => JSX.Element;
export default AppFormInput;
