import { AppColor } from '../theme/AppColor';
import { formElementProps } from './forms/AppForm';
interface formInputProps extends formElementProps {
    input: "line" | "text" | "array";
}
export declare type InputStatus = "empty" | "invalid" | "unknown" | "valid";
export declare const inputStatusColorMap: Record<InputStatus, AppColor>;
/**
 * Component for input that displays validation errors
 */
declare const AppFormInput: (props: formInputProps) => JSX.Element;
export default AppFormInput;
