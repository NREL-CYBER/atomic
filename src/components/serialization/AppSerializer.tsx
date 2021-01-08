import { FC, useEffect } from "react";
import React from "react";
import { AppCacheIndex } from "../../state/AppCache";
interface appSerializerProps {
    mode: "cloud" | "local"
    cache: AppCacheIndex
}

const AppSerializer: FC<appSerializerProps> = ({ cache }) => {
    useEffect(() => {
        Object.entries(cache.storage).forEach(([collection, store]) => {
            console.log("Watching " + collection);
        })
    }, [cache.storage])

    return <>
    </>
}
export default AppSerializer;