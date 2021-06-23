import { IonAvatar } from "@ionic/react";
import React, { FC } from "react";


const AppAvatar: FC<{ onClick?: () => void }> = (props) =>
    <IonAvatar {...props} />

export default AppAvatar;