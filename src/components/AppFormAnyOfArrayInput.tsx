import produce from "immer";
import { addOutline } from 'ionicons/icons';
import { isUndefined } from "lodash";
import React, { Suspense, useCallback, useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppLabel, AppLoadingCard, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove } from '../util';
import prettyTitle from '../util/prettyTitle';
import { findShortestValue } from "./AppFormArrayInput";
import { InputStatus, inputStatusColorMap } from "./AppFormInput";
import { findSubSchema, formElementProps, nestedFormProps } from './forms/AppForm';


interface formArrayOfInputProps extends nestedFormProps, formElementProps {
}




/**
 * Find a way to keep this DRY there is too much overlap with standard array editor
 * Add a parameter and provide this functionality there when we actually need this component
 */
const AppFormAnyOfArrayInput = (props: formArrayOfInputProps) => {
    const { property, instanceRef, onChange,
        propertyInfo, customComponentMap, hiddenFields, lockedFields, showFields, objectSchema, rootSchema } = props;
    const existing_data = (instanceRef.current[property] ? instanceRef.current[property] : []);
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>(existing_data.length === 0 ? "empty" : "valid");
    const [status, setStatus] = useState<"idle" | "selecting" | "inserting">("idle");
    const [value, setValue] = useState<any[]>(existing_data)
    const [selectedType, setSelectedType] = useState<any | undefined>()
    const [data, setData] = useState<any>({})
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (val: any = {}) => {
        if (isUndefined(value)) {
            setValue([])
        };
        setData(val);
        setStatus("inserting")
    };
    const removeAndbeginInsert = (val: any) => {
        const valueRemoved = remove<unknown>((item) => item === val, value);
        setValue(valueRemoved);
        beginInsertItem(val);
    }


    const onSubmitItem = useCallback(async (item: any) => {
        const newValue = produce(value, (draftValue) => {
            draftValue.push(item);
        });
        const [validationStatus, errors] = await onChange(property, newValue);
        setStatus("idle");
        setValue(newValue);
        setInputStatus(validationStatus);
        setErrors(errors);
    }, [onChange, property, value])

    const onBackPressed = useCallback(() => {
        setStatus("idle");
        onSubmitItem(data);
    }, [data, onSubmitItem])
    return <AppRow>
        <AppToolbar color="clear"><AppButtons slot='start'>
            <AppButton fill="clear" onClick={() => {
                setStatus("selecting")
            }} color={inputStatusColor} >
                {propertyFormattedName}
            </AppButton>
        </AppButtons>
            <AppButtons>
                {status === "idle" && value && value.map((val, i) => {
                    return <AppChip key={i} onClick={() => removeAndbeginInsert(val)}>
                        {<>
                            {typeof val === "string" && val}
                            {typeof val === "object" && findShortestValue(val)}
                        </>}
                    </AppChip>
                })}
            </AppButtons>
            {status === "selecting" && <>{(propertyInfo.items as any).anyOf!.map((x: any) => <AppButton onClick={() => {
                setSelectedType(x);
                beginInsertItem();
            }} color={"primary"}>
                {x.title || (x.$ref || "").split("/").pop() || x.$id}
            </AppButton>)}</>}
            <AppButtons slot="end">
                {status === "idle" && <AppButton onClick={() => {
                    setStatus("selecting")
                }} fill='solid' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>}
            </AppButtons>
            <div hidden={!(status === "inserting")}>
                {<AppModal isOpen={status === "inserting"} onDismiss={() => setStatus("idle")}>
                    <Suspense fallback={<AppLoadingCard />}>
                        <AppContent>
                            {selectedType && <AppFormComposer
                                showFields={showFields}
                                hiddenFields={hiddenFields}
                                lockedFields={lockedFields}
                                customComponentMap={customComponentMap as any}
                                rootSchema={rootSchema}
                                objectSchema={findSubSchema(rootSchema, objectSchema, selectedType)}
                                data={{ ...data }}
                                onSubmit={onSubmitItem} >
                                <AppBackButton onClick={onBackPressed} />
                            </AppFormComposer>}
                        </AppContent>
                    </Suspense>
                </AppModal>}
            </div>
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

export default AppFormAnyOfArrayInput;