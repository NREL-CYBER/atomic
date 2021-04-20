import { IonToolbar } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface appToolbarProps {
    color?: AppColor
    slot?: "top" | "bottom",
    onClick?: () => void
}


/**
 * Toolbar component!
 * This once also works great with the AppButtons Component.
 * We use this on the top bar, but we might have a footer later on as well.
 */
const AppToolbar: React.FC<appToolbarProps> = ({ color, ...props }) => {
    return <IonToolbar color={color ? color : "clear"}  {...props} />
};
export default AppToolbar;