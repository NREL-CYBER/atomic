import React, { FC, memo } from "react";
import useLocalSerialization from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
interface appSerializerProps {
    mode: "local"
    cache: AppCacheIndex
}

const AppSerializer: FC<appSerializerProps> = ({ cache, mode }) => {
    const { index } = cache;
    const { synchronize } = useLocalSerialization();
    Object.entries(index).forEach(([namespace, collections]) => {
        Object.values(collections).forEach((storeAPI) => {
            synchronize(namespace, storeAPI.getState);
        })
    })
    return <></>
}




export default memo(AppSerializer);