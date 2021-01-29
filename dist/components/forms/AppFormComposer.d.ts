import React, { ReactFragment } from 'react';
import Validator from 'validator';
export interface propertyKeyValue {
    property: string;
    value: string;
}
export interface calculatedPropertyMap {
    map: Record<string, (base: propertyKeyValue) => propertyKeyValue>;
}
export interface formComposerProps {
    validator: Validator<unknown>;
    data: any;
    onSubmit: (validData: any) => void;
    children?: ReactFragment;
    lockedFields?: string[];
    hiddenFields?: string[];
    calculatedFields?: calculatedPropertyMap;
    description?: string;
    title?: string;
    requiredOnly?: boolean;
    showFields?: string[];
    autoSubmit?: boolean;
    customSubmit?: ReactFragment;
}
export declare type formFieldValidationStatus = [formFieldStatus, string[] | undefined];
export declare type formFieldChangeEvent = (property: string, value: any) => formFieldValidationStatus;
export declare type formFieldStatus = "valid" | "invalid" | "empty";
declare const AppFormComposer: React.FC<formComposerProps>;
export default AppFormComposer;
