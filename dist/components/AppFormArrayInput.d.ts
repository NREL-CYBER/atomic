import React, { MutableRefObject } from 'react';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from "validator";
import { formFieldChangeEvent, nestedFormProps } from './forms/AppForm';
interface formInputProps {
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
    customTitleFunction?: (value: any) => string;
    customComponentMap?: Record<string, React.FC<nestedFormProps>>;
    customItemComponent?: React.FC<nestedFormProps>;
}
export declare const findShortestValue: (val: any) => any;
/**
 * Component for input that displays validation errors
 */
declare const AppFormArrayInput: (props: formInputProps) => JSX.Element;
export default AppFormArrayInput;
