import React, { FC, memo, useEffect } from "react";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
export interface appLocalSerializerProps {
    cache: AppCacheIndex
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache }) => {
    const { index } = cache;
    const { synchronize } = useIndexDBStorage();
    useEffect(() => {
        Object.entries(index).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(namespace, storeAPI.getState, "anonymous");
            })
        })
    }, [index, synchronize])

    return <></>
}




export default memo(AppLocalSerializer);