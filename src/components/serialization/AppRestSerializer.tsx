import React, { FC, memo, useEffect, useState } from "react";
import useTimeout from "use-timeout";
import useCache from "../../hooks/useCache";
import { useRestSerializeation } from "../../hooks/useRestSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
import useAppAccount from "../../hooks/useAppAccount";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
}

const AppRestSerializer: FC<appLocalSerializerProps> = ({ cache, serialization }) => {

    const { synchronize } = useRestSerializeation();
    const [booting, setIsBooting] = useState(true);
    const { status, ready } = useCache();
    const synchronized = status === "idle"
    const { uid, authProvider } = useAppAccount();
    useTimeout(() => {
        setIsBooting(false);
    }, 200);

    useEffect(() => {
        if (booting || synchronized || (typeof uid === "undefined" && typeof authProvider !== "undefined")) {
            return;
        }
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(serialization, namespace, storeAPI.getState, uid || "");
            })
        })
        ready();
    }, [authProvider, booting, cache, ready, serialization, synchronize, synchronized, uid])
    return <></>
}




export default memo(AppRestSerializer);