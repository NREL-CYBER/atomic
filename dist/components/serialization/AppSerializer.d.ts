import { FC } from "react";
import { AppCacheIndex } from "../../state/AppCacheIndex";
interface appSerializerProps {
    mode: "local";
    cache: AppCacheIndex;
    preload: (cache: AppCacheIndex) => void;
}
declare const AppSerializer: FC<appSerializerProps>;
export default AppSerializer;
