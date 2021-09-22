import { IonAvatar } from "@ionic/react";
import React, { FC, MouseEventHandler } from "react";


const AppAvatar: FC<{ onClick?: MouseEventHandler }> = (props) =>
    <IonAvatar {...props} />

export default AppAvatar;