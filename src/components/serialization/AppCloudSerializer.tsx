import React, { FC, memo } from "react";
import { AppCloudConfig } from "../../util/AppConfig";
import { appLocalSerializerProps } from "./AppLocalSerializer";
interface appCloudSerializerProps extends appLocalSerializerProps {
    cloud: AppCloudConfig
    uid: string
}

const AppCloudSerializer: FC<appCloudSerializerProps> = ({ cache, uid, cloud }) => {
    // const cloudSerializer = useFirebaseStorage(cloud)
    // const { synchronize } = cloudSerializer();
    // useTimeout(() => {
    //     if (uid === undefined) {
    //         return;
    //     }
    //     Object.entries(cache).forEach(([namespace, collections]) => {
    //         Object.values(collections).forEach((storeAPI) => {
    //             synchronize(storeAPI.getState, uid);
    //         })
    //     })

    // }, 500);
    return <></>
}




export default memo(AppCloudSerializer);