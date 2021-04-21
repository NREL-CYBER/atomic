import React, { FC, memo, useEffect, useState } from "react";
import useTimeout from "use-timeout";
import useCache from "../../hooks/useCache";
import { useRestSerializeation } from "../../hooks/useRestSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
}

const AppRestSerializer: FC<appLocalSerializerProps> = ({ cache, serialization }) => {

    const { synchronize } = useRestSerializeation();
    const [booting, setIsBooting] = useState(true);
    const { synchronized, ready } = useCache();
    useTimeout(() => {
        setIsBooting(false);
    }, 200);

    useEffect(() => {
        if (booting || synchronized) {
            return;
        }
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(serialization, namespace, storeAPI.getState, "uid");
            })
        })
        ready();
    }, [booting, cache, ready, serialization, synchronize, synchronized])
    return <></>
}




export default memo(AppRestSerializer);