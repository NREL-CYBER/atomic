import { formElementProps } from './forms/AppForm';
export interface formSelectArrayInputProps extends formElementProps {
    propertyInfo: {
        title: string;
        description: string;
        enum: string[];
    };
    multiple?: boolean;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormSelectArray: (props: formSelectArrayInputProps) => JSX.Element;
export default AppFormSelectArray;
