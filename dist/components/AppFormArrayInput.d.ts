import Validator from 'validator';
import { MutableRefObject } from 'react';
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
    onValid: (property: string) => void;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormArrayInput: (props: formInputProps<unknown>) => JSX.Element;
export default AppFormArrayInput;
