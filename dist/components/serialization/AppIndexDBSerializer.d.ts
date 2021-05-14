import React from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
export interface appLocalSerializerProps {
    cache: AppCacheIndex;
    serialization: AppSerializationConfig;
}
declare const _default: React.NamedExoticComponent<appLocalSerializerProps>;
export default _default;
