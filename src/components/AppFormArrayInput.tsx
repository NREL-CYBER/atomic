import { ErrorObject } from 'ajv';
import entity from 'core/entity';
import validator, { ArrayPropertyInfo } from 'core/validation/Validator';
import FormComposer from 'forms/FormComposer';
import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, useEffect, useState } from 'react';
import titleCase from 'sugar/titleCase';
import { AppBackButton, AppButton, AppButtons, AppChip, AppColor, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';


interface formInputProps<T> {
    property: string
    propertyInfo: ArrayPropertyInfo
    instanceRef: MutableRefObject<entity>
    validator: validator<T>
    onValid: (property: string) => void
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormArrayInput = (props: formInputProps<entity>) => {
    const { property, instanceRef, validator, propertyInfo } = props;
    const [errors, setErrors] = useState<ErrorObject[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<entity[]>(instanceRef.current && (instanceRef.current as any)[property])

    const propertyFormattedName = titleCase(property).replace("-", " ");
    useEffect(() => {
        const change: Record<string, entity[]> = {}
        change[property] = value
        instanceRef.current = { ...instanceRef.current, ...change }
        validator.validate(instanceRef.current)
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property))
        if (propertyErrors.length == 0 && value) {
            setInputStatus("valid");
        } else if (value) {
            setInputStatus("invalid");
        } else {
            setInputStatus("empty");
        }
        setErrors(propertyErrors);
    }, [value])


    const inputStatusColor = inputStatusColorMap[inputStatus];

    return <AppRow>
        <AppToolbar>
            <AppButtons slot='start'>
                <AppLabel color={inputStatusColor} >
                    {propertyFormattedName}
                </AppLabel>
            </AppButtons>
            <AppButtons>
                {value && value.map((val, i) => {
                    return <AppChip key={i}>
                        {val.hasOwnProperty("id") && (val as any)["id"]}
                        {val.hasOwnProperty("type") && (val as any)["type"]}
                        {val.hasOwnProperty("name") && (val as any)["name"]}
                        {val.hasOwnProperty("value") && (val as any)["value"]}
                        {val.hasOwnProperty("text") && (val as any)["text"]}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => { if (typeof (value) === "undefined") { setValue([]) }; setIsInsertingItem(true) }} fill='outline' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <FormComposer
                        validator={validator.makeReferenceValidator(propertyInfo)}
                        data={{}}
                        onSubmit={(item) => {
                            setValue([...value, item])
                            setIsInsertingItem(false);
                        }} >
                        <AppBackButton onClick={() => setIsInsertingItem(false)} />
                    </FormComposer>}
                </AppContent>
            </AppModal>
        </AppToolbar>
        {errors && errors.length > 0 && < AppItem >

            <AppLabel position='stacked' color='danger'>
                {errors.map(error => <AppText>
                    {error.message}
                </AppText>)}
            </AppLabel>
        </AppItem>
        }
    </AppRow >
}

export default AppFormArrayInput;