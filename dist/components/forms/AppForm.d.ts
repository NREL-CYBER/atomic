import React, { MutableRefObject, ReactFragment } from 'react';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from 'validator';
export interface propertyKeyValue {
    property: string;
    value: string;
}
export interface calculatedPropertyMap {
    map: Record<string, (base: propertyKeyValue) => propertyKeyValue>;
}
export interface formNodeProps extends formProps {
}
export interface formProps {
    data: any;
    hideTitle?: boolean;
    rootSchema: RootSchemaObject;
    objectSchema?: SchemaObjectDefinition;
    onSubmit: (validData: any) => void;
    children?: ReactFragment;
    lockedFields?: string[];
    dependencyMap?: Record<string, string[]>;
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
    context?: any;
}
export declare type formFieldValidationStatus = [formFieldStatus, string[] | undefined];
export declare type formFieldChangeEvent = (property: string, value: any) => Promise<formFieldValidationStatus>;
export interface formElementProps {
    required?: boolean;
    property: string;
    propertyInfo: PropertyDefinitionRef;
    instanceRef: MutableRefObject<any>;
    rootSchema: RootSchemaObject;
    objectSchema: SchemaObjectDefinition;
    onChange: formFieldChangeEvent;
    context?: any;
}
export interface nestedFormProps {
    required?: boolean;
    inline?: boolean;
    property: string;
    propertyInfo: PropertyDefinitionRef;
    instanceRef: MutableRefObject<any>;
    objectSchema: SchemaObjectDefinition;
    rootSchema: RootSchemaObject;
    onChange: formFieldChangeEvent;
    showFields?: string[];
    hiddenFields?: string[];
    lockedFields?: string[];
    dependencyMap?: Record<string, string[]>;
    customTitleFunction?: (value: any) => string;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
    context?: any;
}
export declare type formFieldStatus = "valid" | "invalid" | "unknown" | "empty";
declare const AppForm: React.FC<formNodeProps>;
export default AppForm;
export declare function findSubSchema(schema: RootSchemaObject, objectSchema: SchemaObjectDefinition, propertyInfo: PropertyDefinitionRef): SchemaObjectDefinition;
export declare function findSchemaDefinitionId(schema: RootSchemaObject, propertyInfo: PropertyDefinitionRef): string;
export declare function findSchemaDefinition(schema: RootSchemaObject, definition: string): SchemaObjectDefinition;
export declare function findReferenceInformation(rootSchema: RootSchemaObject, objectSchema: SchemaObjectDefinition, property: string, propInfo: PropertyDefinitionRef): PropertyDefinitionRef;
