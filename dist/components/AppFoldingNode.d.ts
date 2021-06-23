import { FC, ReactFragment } from "react";
import { AppColor } from "../theme";
/**
 * A simple folding node for show-hide content & composing tree views naturally
 * TODO: We should make these sizes based off column setting & add that to app config
 * */
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
