import { MutableRefObject } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { formFieldChangeEvent } from './AppForm';
interface formInputProps {
    propertyInfo: PropertyDefinitionRef;
    property: string;
    instanceRef: MutableRefObject<any>;
    onChange: formFieldChangeEvent;
    format?: string;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormDateTimePicker: (props: formInputProps) => JSX.Element;
export default AppFormDateTimePicker;
