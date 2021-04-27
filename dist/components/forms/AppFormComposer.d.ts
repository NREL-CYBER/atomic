import React from "react";
import { formComposerProps } from "./AppForm";
/**
 *
 *  Compose a form from a Promise of a validator.
 * @param options:{
    data: any,  the data that already is in the form, Note if you change this outside the form, it will not update
    onSubmit: (validData: any) => void, this will only be called if the form input passes validation, you don't have to validate again
    children?: ReactFragment, for custom components in the top lefthand part of the form (backButton)
    lockedFields?: string[]  display Locked fields as a chip that is not editable
    hiddenFields?: string[]  hide these fields from display
    inlineFields?: string[]  inline fields that would normally bring up a nested modal form
    calculatedFields?: calculatedPropertyMap // calculate fields on data-change
    description?: string to override the definition or schema description if there is one
    title?: string to override the definition or schema description if there is one
    requiredOnly?: boolean
    showFields?: string[]
    autoSubmit?: boolean
    customSubmit?: ReactFragment
    customComponentMap?: Record<string, React.FC<nestedFormProps>>
 }
 */
declare const AppFormComposer: React.FC<formComposerProps>;
export default AppFormComposer;
