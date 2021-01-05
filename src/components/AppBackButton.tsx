import AppButton from "./AppButton"
import AppIcon from "./AppIcon"
import { arrowBackOutline } from "ionicons/icons"
import { AppColor } from '../theme/AppColor';
import React, { FC } from "react"
interface backButtonProps {
    onClick: () => void;
    color?: AppColor;
}

const AppBackButton: FC<backButtonProps> = (props) =>
    <AppButton {...props}  >
        <AppIcon icon={arrowBackOutline} />
    </AppButton>

export default AppBackButton;