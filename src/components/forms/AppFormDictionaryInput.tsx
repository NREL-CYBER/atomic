import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, useState } from 'react';
import { v4 } from 'uuid';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from "validator";
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '..';
import { prettyTitle } from "../../util";
import { findShortestValue } from "../AppFormArrayInput";
import { InputStatus, inputStatusColorMap } from "../AppFormInput";
import { findSubSchema, formFieldChangeEvent, nestedFormProps } from './AppForm';


interface formInputProps<T> {
    inline?: boolean,
    property: string
    propertyInfo: PropertyDefinitionRef
    instanceRef: MutableRefObject<any>
    objectSchema: SchemaObjectDefinition,
    rootSchema: RootSchemaObject,
    onChange: formFieldChangeEvent,
    showFields?: string[],
    hiddenFields?: string[],
    lockedFields?: string[],
    customTitleFunction?: (value: any) => string,
    customComponentMap?: Record<string, React.FC<nestedFormProps>>
}


/**
 * Component for input that displays validation errors
 */
const AppFormDictionaryInput = (props: formInputProps<unknown>) => {
    console.log(props.propertyInfo);
    //destructure props
    const { property, instanceRef, objectSchema, onChange,
        propertyInfo, customComponentMap, hiddenFields,
        lockedFields, showFields, customTitleFunction, rootSchema } = props;
    const { title } = propertyInfo;
    //local state
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<Record<string, any>>(instanceRef.current[property] ? instanceRef.current[property] : {})
    const [data, setData] = useState<any>({})
    const [activeIndex, setActiveIndex] = useState<string | undefined>(undefined);
    //local queries
    const propertyFormattedName = prettyTitle(title || property)
    const inputStatusColor = inputStatusColorMap[inputStatus];
    //local events
    const beginInsertItem = (index: string = v4(), val: any = {}) => {
        setActiveIndex(index);
        if (typeof (value) === "undefined") { setValue({}) };
        setData(val);
        setIsInsertingItem(true)
    };
    const onSubmitValue = (item: any) => {
        const newValue = produce(value, (draftValue: { [x: string]: any; }) => {
            draftValue[activeIndex ? activeIndex : v4()] = item;
        });
        onChange(property, newValue).then(([validationStatus, errors]) => {
            setIsInsertingItem(false);
            setValue(newValue);
            setInputStatus(validationStatus);
            setErrors(errors);
        });
    }

    return <AppRow>
        <AppToolbar color="clear">
            <AppButtons slot='start'>
                <AppButton fill="clear" onClick={() => {
                    beginInsertItem()
                }} color={inputStatusColor} >
                    {propertyFormattedName}
                </AppButton>
            </AppButtons>
            <AppButtons>
                {value && Object.entries(value).map(([i, val]) => {
                    return <AppChip key={i} onClick={() => {
                        beginInsertItem(i, val);
                    }}>
                        {customTitleFunction ? customTitleFunction(val) : <>
                            {typeof val === "string" && val}
                            {typeof val === "object" && findShortestValue(val)}
                        </>}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => { beginInsertItem(v4()) }} fill='solid' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <AppFormComposer
                        customComponentMap={customComponentMap}
                        objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                        rootSchema={rootSchema}
                        data={{ ...data }}
                        showFields={showFields}
                        hiddenFields={hiddenFields}
                        lockedFields={lockedFields}

                        onSubmit={onSubmitValue} >
                        <AppBackButton onClick={() => {
                            setIsInsertingItem(false);
                        }} />
                    </AppFormComposer>}
                </AppContent>
            </AppModal>
        </AppToolbar>
        {
            errors && errors.length > 0 && < AppItem >

                <AppLabel position='stacked' color='danger'>
                    {errors.map(error => <AppText>
                        {error}
                    </AppText>)}
                </AppLabel>
            </AppItem>
        }
    </AppRow >
}

export default AppFormDictionaryInput;