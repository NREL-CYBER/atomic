import React, { FC, memo } from "react";
import useTimeout from "use-timeout";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache, serialization }) => {

    //TODO implement encryption
    const { synchronize } = useIndexDBStorage();
    Object.entries(cache).forEach(([namespace, collections]) => {
        Object.values(collections).forEach((storeAPI) => {
            synchronize(namespace, storeAPI.getState, "anon");
        })
    })
    return <></>
}




export default memo(AppLocalSerializer);