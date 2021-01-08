import { MutableRefObject } from 'react';
import Validator from 'validator';
interface formInputProps<T> {
    property: string;
    instanceRef: MutableRefObject<any>;
    validator: Validator<T>;
    input: "line" | "text";
    onValid: (property: string) => void;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormInput: (props: formInputProps<any>) => JSX.Element;
export default AppFormInput;
