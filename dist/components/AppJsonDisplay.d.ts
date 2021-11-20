/// <reference types="react" />
import { PropertyDefinitionRef } from "validator";
export declare const AppJsonDisplay: React.FC<{
    customRenderMap?: Record<string, React.FC<{
        value: any;
    }>>;
    value: any;
    propertyInfo: PropertyDefinitionRef;
}>;
export declare const VisualizeValue: import("react").FC<{
    customRenderMap?: Record<string, import("react").FC<{
        value: any;
    }>> | undefined;
    value: any;
    propertyInfo: PropertyDefinitionRef;
}>;
