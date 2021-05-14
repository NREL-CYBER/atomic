import React, { MutableRefObject } from 'react';

interface formInputProps {
    instanceRef: MutableRefObject<any>
}


const AppLastModifiedGenerator = (props: formInputProps) => {
    const { instanceRef } = props;
    instanceRef.current.last_modified = new Date().toISOString();
    return <></>
}

export default AppLastModifiedGenerator;