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
    rootSchema: RootSchemaObject;
    objectSchema?: SchemaObjectDefinition;
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
export declare type formFieldChangeEvent = (property: string, value: any) => Promise<formFieldValidationStatus>;
export interface nestedFormProps {
    property: string;
    inline?: boolean;
    instanceRef: MutableRefObject<any>;
    propertyInfo: PropertyDefinitionRef;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
    onChange: formFieldChangeEvent;
}
export declare type formFieldStatus = "valid" | "invalid" | "unknown" | "empty";
declare const AppForm: React.FC<formNodeProps>;
declare const AppFormComposer: React.FC<formNodeProps>;
export default AppForm;
export { AppFormComposer };
export declare function findSubSchema(schema: RootSchemaObject, objectSchema: SchemaObjectDefinition, propertyInfo: PropertyDefinitionRef): SchemaObjectDefinition;
export declare function findSchemaDefinitionId(schema: RootSchemaObject, propertyInfo: PropertyDefinitionRef): string;
export declare function findSchemaDefinition(schema: RootSchemaObject, definition: string): SchemaObjectDefinition;
export declare function findReferenceInformation(rootSchema: RootSchemaObject, objectSchema: SchemaObjectDefinition, property: string, propInfo: PropertyDefinitionRef): PropertyDefinitionRef;
