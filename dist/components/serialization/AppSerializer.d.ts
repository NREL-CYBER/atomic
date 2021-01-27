import React from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
interface appSerializerProps {
    mode: "local";
    cache: AppCacheIndex;
    preload: (cache: AppCacheIndex) => void;
}
declare const _default: React.NamedExoticComponent<appSerializerProps>;
export default _default;
