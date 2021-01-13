import { FC, useEffect } from "react";
import React from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
interface appSerializerProps {
    mode: "cloud" | "local"
    cache: AppCacheIndex
}

const AppSerializer: FC<appSerializerProps> = ({ cache }) => {
    useEffect(() => {
        Object.entries(cache).forEach(([collection, store]) => {
            console.log("Watching " + collection);
        })
    }, [cache])

    return <>
    </>
}
export default AppSerializer;