import { AppColor } from '../theme/AppColor';
import { FC } from "react";
interface backButtonProps {
    onClick: () => void;
    color?: AppColor;
}
declare const AppBackButton: FC<backButtonProps>;
export default AppBackButton;
