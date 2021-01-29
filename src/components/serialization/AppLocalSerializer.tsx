import React, { FC, memo, useEffect } from "react";
import useLocalSerialization from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
export interface appLocalSerializerProps {
    cache: AppCacheIndex
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache }) => {
    const { index } = cache;
    const synchronizeWithLocalStorage = useLocalSerialization(x => x.synchronize);
    useEffect(() => {
        Object.entries(index).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronizeWithLocalStorage(namespace, storeAPI.getState);
            })
        })
    }, [index, synchronizeWithLocalStorage])

    return <></>
}




export default memo(AppLocalSerializer);