import { AppColor } from "atomic";
import React, { MouseEventHandler } from "react";
export declare const AppFormLabel: React.FC<{
    name: string;
    onClick?: MouseEventHandler;
    color: AppColor;
    info?: string;
    required?: boolean;
}>;
