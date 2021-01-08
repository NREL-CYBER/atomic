import AppButton from "./AppButton";
import AppIcon from "./AppIcon";
import { arrowBackOutline } from "ionicons/icons";
import React from "react";

const AppBackButton = props => <AppButton {...props}>
        <AppIcon icon={arrowBackOutline} />
    </AppButton>;

export default AppBackButton;