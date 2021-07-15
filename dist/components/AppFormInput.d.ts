import { MutableRefObject } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppColor } from '../theme/AppColor';
import { formFieldChangeEvent } from './forms/AppForm';
interface formInputProps<T> {
    propertyInfo: PropertyDefinitionRef;
    property: string;
    instanceRef: MutableRefObject<T>;
    input: "line" | "text" | "array";
    onChange: formFieldChangeEvent;
}
export declare type InputStatus = "empty" | "invalid" | "unknown" | "valid";
export declare const inputStatusColorMap: Record<InputStatus, AppColor>;
/**
 * Component for input that displays validation errors
 */
declare const AppFormInput: (props: formInputProps<any>) => JSX.Element;
export default AppFormInput;
