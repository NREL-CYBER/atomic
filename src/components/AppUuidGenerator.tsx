import React, { MutableRefObject } from 'react';
import { v4 as uuidv4 } from "uuid";

interface formInputProps<T> {
}


/**
 * Component for input that displays validation errors
 */
const AppUuidGenerator: React.FC<{ instanceRef: MutableRefObject<any> }> = ({ instanceRef }) => {
    if (instanceRef.current.uuid === undefined) {
        instanceRef.current.uuid = uuidv4();
    }
    return <></>
}

export default AppUuidGenerator;