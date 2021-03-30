import { MutableRefObject } from 'react';
import { formFieldChangeEvent } from './forms/AppForm';
export interface formSelectInputProps {
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
declare const AppFormSelect: (props: formSelectInputProps) => JSX.Element;
export default AppFormSelect;
