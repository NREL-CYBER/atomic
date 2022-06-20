/// <reference types="react" />
import { formElementProps, nestedFormProps } from './forms/AppForm';
interface formArrayOfInputProps extends nestedFormProps, formElementProps {
}
/**
 * Find a way to keep this DRY there is too much overlap with standard array editor
 * Add a parameter and provide this functionality there when we actually need this component
 */
declare const AppFormAnyOfArrayInput: (props: formArrayOfInputProps) => JSX.Element;
export default AppFormAnyOfArrayInput;
