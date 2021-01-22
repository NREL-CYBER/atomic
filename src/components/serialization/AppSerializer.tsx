import { FC, useEffect } from "react";
import React from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import useLocalSerialization from "../../hooks/useLocalSerialization";
interface appSerializerProps {
    mode: "cloud" | "local"
    cache: AppCacheIndex
}

const AppSerializer: FC<appSerializerProps> = ({ cache, mode }) => {
    const { index } = cache;
    const { synchronize } = useLocalSerialization();
    useEffect(() => {
        Object.entries(index).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                if (mode === "local") {
                    synchronize(namespace, storeAPI.getState);
                }
            })
        })
    }, [index, mode, synchronize])


    return <>
    </>
}
export default AppSerializer;