/// <reference types="react" />
import { AppColor } from "atomic";
export declare const AppFormLabel: React.FC<{
    name: string;
    onClick?: () => void;
    color: AppColor;
    info?: string;
    required?: boolean;
}>;
