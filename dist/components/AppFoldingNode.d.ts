import { FC, ReactFragment } from "react";
import { AppColor } from "../theme";
declare const AppFoldingNode: FC<{
    color?: AppColor;
    folded?: boolean;
    titleText?: boolean;
    title: ReactFragment;
    centerContent?: ReactFragment;
    endContent?: ReactFragment;
    hideIcon?: boolean;
}>;
export default AppFoldingNode;
