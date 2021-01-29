import React from "react";
import { AppCloudConfig } from "../../util/AppConfig";
import { appLocalSerializerProps } from "./AppLocalSerializer";
interface appCloudSerializerProps extends appLocalSerializerProps {
    cloud: AppCloudConfig;
    uid: string;
}
declare const _default: React.NamedExoticComponent<appCloudSerializerProps>;
export default _default;
