import { FC } from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
interface appSerializerProps {
    mode: "cloud" | "local";
    cache: AppCacheIndex;
}
declare const AppSerializer: FC<appSerializerProps>;
export default AppSerializer;
