import { FC, useEffect } from "react";
import React from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import useLocalSerialization from "../../hooks/useLocalSerialization";
interface appSerializerProps {
    mode: "local"
    cache: AppCacheIndex
    preload: (cache: AppCacheIndex) => void
}

const AppSerializer: FC<appSerializerProps> = ({ cache, mode, preload }) => {
    const { index } = cache;
    const { synchronize } = useLocalSerialization();
    useEffect(() => {
        preload(cache);
        Object.entries(index).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                if (mode === "local") {
                    synchronize(namespace, storeAPI.getState);
                }
            })
        })
    }, [cache, index, mode, preload, synchronize])


    return <>
    </>
}
export default AppSerializer;