import { MutableRefObject } from 'react';
import { formFieldChangeEvent } from './forms/AppForm';
export interface formSelectArrayInputProps {
    property: string;
    propertyInfo: {
        title: string;
        description: string;
        enum: string[];
    };
    instanceRef: MutableRefObject<any>;
    onChange: formFieldChangeEvent;
    multiple?: boolean;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormSelectArray: (props: formSelectArrayInputProps) => JSX.Element;
export default AppFormSelectArray;
