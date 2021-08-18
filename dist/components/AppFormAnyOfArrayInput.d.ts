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
}
/**
 * Find a way to keep this DRY there is too much overlap with standard array editor
 * Add a parameter and provide this functionality there when we actually need this component
 */
declare const AppFormAnyOfArrayInput: (props: formInputProps) => JSX.Element;
export default AppFormAnyOfArrayInput;
