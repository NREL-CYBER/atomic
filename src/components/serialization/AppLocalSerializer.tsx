import React, { FC, memo, useState } from "react";
import useTimeout from "use-timeout";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
import { useEffect } from "@storybook/addons";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache, serialization }) => {

    //TODO implement encryption
    const { synchronize } = useIndexDBStorage();
    const [booting, setIsBooting] = useState(true);
    const [synchronized, setSynchronized] = useState(false);
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
        setSynchronized(true);
    }, [booting, cache, synchronize, synchronized])
    return <></>
}




export default memo(AppLocalSerializer);