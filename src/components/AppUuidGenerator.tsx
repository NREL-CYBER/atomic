import { ErrorObject } from 'ajv';
import Validator from 'validator';
import React, { MutableRefObject, useEffect, useState } from 'react';
import titleCase from '../util/titleCase';
import { v4 as uuidv4 } from "uuid";
import AppButtons from './AppButtons';
import { AppColor } from '../theme/AppColor';
import AppChip from './AppChip';
import AppCol from './AppCol';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';

interface formInputProps<T> {
    instanceRef: MutableRefObject<any>
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppUuidGenerator = (props: formInputProps<any>) => {
    const { instanceRef } = props;
    const property = "uuid";
    if (instanceRef.current.uuid === undefined) {
        instanceRef.current.uuid = uuidv4();
    }
    const [value] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || "")
    useEffect(() => {
        const change: Record<string, string> = {}
        change[property] = value
        instanceRef.current = { ...instanceRef.current, ...change }
    }, [instanceRef, value])

    return <></>
}

export default AppUuidGenerator;