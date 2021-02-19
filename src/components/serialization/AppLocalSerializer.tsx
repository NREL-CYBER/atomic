import React, { FC, memo, useState } from "react";
import useTimeout from "use-timeout";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
import { useEffect } from "react";
import useCache from "../../hooks/useCache";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache, serialization }) => {

    //TODO implement encryption
    const { synchronize } = useIndexDBStorage();
    const [booting, setIsBooting] = useState(true);
    const { synchronized, ready } = useCache();
    useTimeout(() => {
        setIsBooting(false);
    }, 500);

    useEffect(() => {
        if (booting || synchronized) {
            return;
        }
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(namespace, storeAPI.getState, "anon");
            })
        })
        ready();
    }, [booting, cache, ready, synchronize, synchronized])
    return <></>
}




export default memo(AppLocalSerializer);