import { MutableRefObject } from 'react';
import { formFieldChangeEvent } from './forms/AppForm';
export interface formInputProps<T> {
    property: string;
    propertyInfo: {
        title: string;
        description: string;
        enum: string[];
    };
    instanceRef: MutableRefObject<any>;
    onChange: formFieldChangeEvent;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormSelectSingle: (props: formInputProps<any>) => JSX.Element;
export default AppFormSelectSingle;
