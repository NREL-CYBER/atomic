import { MutableRefObject } from 'react';
import { AppColor } from '../theme/AppColor';
import { formFieldChangeEvent } from './forms/AppFormComposer';
interface formToggleProps<T> {
    property: string;
    propertyInfo: {
        title: string;
        description: string;
    };
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
