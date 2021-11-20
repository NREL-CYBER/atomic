import { PropertyDefinitionRef } from "validator";
import React from "react";
export declare const AppJsonDisplay: React.FC<{
    customRenderMap?: Record<string, React.FC<{
        value: any;
    }>>;
    value: any;
    propertyInfo: PropertyDefinitionRef;
}>;
export declare const VisualizeValue: React.FC<{
    customRenderMap?: Record<string, React.FC<{
        value: any;
    }>> | undefined;
    value: any;
    propertyInfo: PropertyDefinitionRef;
}>;
