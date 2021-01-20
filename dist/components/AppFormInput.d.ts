import { MutableRefObject } from 'react';
import { formFieldChangeEvent } from './forms/AppFormComposer';
interface formInputProps<T> {
    property: string;
    instanceRef: MutableRefObject<any>;
    input: "line" | "text";
    onChange: formFieldChangeEvent;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormInput: (props: formInputProps<any>) => JSX.Element;
export default AppFormInput;
