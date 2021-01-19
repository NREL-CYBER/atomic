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
}
declare const _default: React.MemoExoticComponent<(props: formComposerProps) => JSX.Element>;
export default _default;
