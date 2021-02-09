import React, { FC, memo, useEffect } from "react";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache }) => {
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