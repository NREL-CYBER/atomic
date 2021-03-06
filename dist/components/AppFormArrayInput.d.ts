import React from 'react';
import { nestedFormProps } from './forms/AppForm';
interface formInputProps extends nestedFormProps {
    required?: boolean;
    inline?: boolean;
    customRenderMap?: Record<string, React.FC<{
        value: any;
    }>>;
    customInputMap?: Record<string, React.FC<nestedFormProps>>;
    context?: any;
}
export declare const findShortestValue: (val: any) => any;
/**
 * Component for input that displays validation errors
 */
declare const AppFormArrayInput: (props: formInputProps) => JSX.Element;
export default AppFormArrayInput;
