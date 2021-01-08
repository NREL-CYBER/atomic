import { MutableRefObject } from 'react';
import validator from 'validator';
interface formInputProps<T> {
    property: string;
    propertyInfo: {
        title: string;
        description: string;
        enum: string[];
    };
    instanceRef: MutableRefObject<any>;
    validator: validator<T>;
    onValid: (property: string) => void;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormSelect: (props: formInputProps<any>) => JSX.Element;
export default AppFormSelect;
