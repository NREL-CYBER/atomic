import { MutableRefObject } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { formFieldChangeEvent } from './AppForm';
interface formInputProps {
    propertyInfo: PropertyDefinitionRef;
    property: string;
    instanceRef: MutableRefObject<any>;
    onChange: formFieldChangeEvent;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormNumber: (props: formInputProps) => JSX.Element;
export default AppFormNumber;
