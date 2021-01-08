import Validator from 'validator';
import { MutableRefObject } from 'react';
interface formInputProps<T> {
    instanceRef: MutableRefObject<any>;
    validator: Validator<T>;
}
/**
 * Component for input that displays validation errors
 */
declare const AppUuidGenerator: (props: formInputProps<any>) => JSX.Element;
export default AppUuidGenerator;
