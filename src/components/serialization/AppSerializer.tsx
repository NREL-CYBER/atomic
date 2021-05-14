import React, { FC, memo, useEffect, useState } from "react";
import { UseStore } from "zustand";
import useAppLayout from "../../hooks/useAppLayout";
import { SynchronizationContext } from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";

export interface appLocalSerializerProps {
    cache: AppCacheIndex
    serialization: AppSerializationConfig
    context: UseStore<SynchronizationContext>
    uid?: string
}

const AppLocalSerializer: FC<appLocalSerializerProps> = ({ cache, serialization, context, uid }) => {

    //TODO implement encryption
    const { synchronize } = context();
    const { status, setStatus } = useAppLayout();
    const cache_items = Object.entries(cache).flatMap(([namespace, collections]) =>
        Object.values(collections).length
    ).reduce((a, b) => a + b, 0)

    const [remaining, setRemaining] = useState<number>(cache_items)
    useEffect(() => {
        remaining === 0 && setStatus("idle");
    }, [remaining, setStatus])
    useEffect(() => {
        if (status !== "synchronizing") {
            return;
        }
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(serialization, namespace, storeAPI.getState, uid || "secret", () => {
                    console.log("Synchronized " + namespace + storeAPI.getState().collection)
                    setRemaining(x => x - 1);
                });
            })
        })
    }, [cache, serialization, status, synchronize, uid])
    return <></>
}




export default memo(AppLocalSerializer);