import { MutableRefObject } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { formFieldChangeEvent } from './forms/AppForm';
interface formToggleProps<T> {
    property: string;
    propertyInfo: PropertyDefinitionRef;
    instanceRef: MutableRefObject<T>;
    onChange: formFieldChangeEvent;
}
/**
 * Component for toggle that displays validation errors
 */
declare const AppFormToggle: (props: formToggleProps<any>) => JSX.Element;
export default AppFormToggle;
