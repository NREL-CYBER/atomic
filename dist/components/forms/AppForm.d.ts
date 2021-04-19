import React, { MutableRefObject, ReactFragment } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
export interface propertyKeyValue {
    property: string;
    value: string;
}
export interface calculatedPropertyMap {
    map: Record<string, (base: propertyKeyValue) => propertyKeyValue>;
}
export interface formComposerProps extends formProps {
    lazyLoadValidator: () => Promise<Validator<unknown>>;
    definition?: string;
}
export interface formNodeProps extends formProps {
    validator: Validator<unknown>;
}
export interface formProps {
    data: any;
    onSubmit: (validData: any) => void;
    children?: ReactFragment;
    lockedFields?: string[];
    hiddenFields?: string[];
    inlineFields?: string[];
    calculatedFields?: calculatedPropertyMap;
    description?: string;
    title?: string;
    requiredOnly?: boolean;
    showFields?: string[];
    autoSubmit?: boolean;
    customSubmit?: ReactFragment;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
}
export declare type formFieldValidationStatus = [formFieldStatus, string[] | undefined];
export declare type formFieldChangeEvent = (property: string, value: any) => formFieldValidationStatus;
export interface nestedFormProps {
    property: string;
    inline?: boolean;
    instanceRef: MutableRefObject<any>;
    propertyInfo: PropertyDefinitionRef;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
    onChange: formFieldChangeEvent;
}
export declare type formFieldStatus = "valid" | "invalid" | "empty";
declare const AppForm: React.FC<formNodeProps>;
export default AppForm;
