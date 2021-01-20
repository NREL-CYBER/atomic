import { MutableRefObject } from 'react';
import Validator from 'validator';
import { formFieldChangeEvent } from './forms/AppFormComposer';
export interface ArrayPropertyInfo {
    type: "array";
    minItems: number;
    items: {
        $ref: string;
    };
}
interface formInputProps<T> {
    property: string;
    propertyInfo: ArrayPropertyInfo;
    instanceRef: MutableRefObject<any>;
    validator: Validator<T>;
    onChange: formFieldChangeEvent;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormArrayInput: (props: formInputProps<unknown>) => JSX.Element;
export default AppFormArrayInput;
