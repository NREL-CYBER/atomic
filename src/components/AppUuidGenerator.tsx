import React, { MutableRefObject, useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { AppColor } from '../theme/AppColor';

interface formInputProps<T> {
}


/**
 * Component for input that displays validation errors
 */
const AppUuidGenerator: React.FC<{ instanceRef: MutableRefObject<any> }> = ({ instanceRef }) => {
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