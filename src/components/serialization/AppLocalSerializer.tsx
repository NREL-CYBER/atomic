import React, { FC, memo, useEffect } from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import useTimeout from "use-timeout";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache, serialization }) => {

    //TODO implement encryption
    const { synchronize } = useIndexDBStorage();
    useTimeout(() => {
        console.log("Begin Cache Synchronization");
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(namespace, storeAPI.getState, "anon");
            })
        })
    }, 1000);

    return <></>
}




export default memo(AppLocalSerializer);