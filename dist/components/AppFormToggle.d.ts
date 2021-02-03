import { MutableRefObject } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppColor } from '../theme/AppColor';
import { formFieldChangeEvent } from './forms/AppForm';
interface formToggleProps<T> {
    property: string;
    propertyInfo: PropertyDefinitionRef;
    instanceRef: MutableRefObject<T>;
    onChange: formFieldChangeEvent;
}
export declare type InputStatus = "empty" | "invalid" | "valid";
export declare const inputStatusColorMap: Record<InputStatus, AppColor>;
/**
 * Component for toggle that displays validation errors
 */
declare const AppFormToggle: (props: formToggleProps<any>) => JSX.Element;
export default AppFormToggle;
