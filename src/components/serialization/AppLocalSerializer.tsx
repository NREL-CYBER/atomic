import React, { FC, memo, useEffect } from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
import useIndexDBStorage from "../../hooks/useLocalSerialization";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serializtion: AppSerializationConfig
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache, serializtion }) => {
    const { synchronize } = useIndexDBStorage();
    useEffect(() => {
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(namespace, storeAPI.getState, "anon");
            })
        })
    }, [cache, synchronize])

    return <></>
}




export default memo(AppLocalSerializer);