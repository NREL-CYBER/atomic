import React, { MutableRefObject } from 'react';

interface formInputProps<T> {
    instanceRef: MutableRefObject<any>
}


const AppLastModifiedGenerator = (props: formInputProps<any>) => {
    const { instanceRef } = props;
    instanceRef.current.last_modified = new Date().toISOString();
    return <></>
}

export default AppLastModifiedGenerator;