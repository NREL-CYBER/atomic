import React, { FC, memo } from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";

export interface appLocalSerializerProps {
    serializtion: AppSerializationConfig
    cache: AppCacheIndex
}

const AppFileSerializer: FC<appLocalSerializerProps> = ({ cache, serializtion }) => {


    return <></>
}




export default memo(AppFileSerializer);