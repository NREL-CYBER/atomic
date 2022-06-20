/// <reference types="react" />
import { formElementProps } from './AppForm';
interface formDateTimePickerProps extends formElementProps {
    format?: string;
}
/**
 * Component for input that displays validation errors
 */
declare const AppFormDateTimePicker: (props: formDateTimePickerProps) => JSX.Element;
export default AppFormDateTimePicker;
