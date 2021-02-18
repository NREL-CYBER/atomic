import React, { FC, memo } from "react";
import useFirebaseStorage from "../../hooks/useFirebaseSerialization";
import { AppCloudConfig } from "../../util/AppConfig";
import { appLocalSerializerProps } from "./AppLocalSerializer";
import useTimeout from "use-timeout";
interface appCloudSerializerProps extends appLocalSerializerProps {
    cloud: AppCloudConfig
    uid: string
}

const AppCloudSerializer: FC<appCloudSerializerProps> = ({ cache, uid, cloud }) => {
    const cloudSerializer = useFirebaseStorage(cloud)
    const { synchronize } = cloudSerializer();
    useTimeout(() => {
        if (uid === undefined) {
            return;
        }
        Object.entries(cache).forEach(([namespace, collections]) => {
            Object.values(collections).forEach((storeAPI) => {
                synchronize(storeAPI.getState, uid);
            })
        })

    }, 500);
    return <></>
}




export default memo(AppCloudSerializer);