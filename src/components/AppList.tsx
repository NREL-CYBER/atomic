import { IonList } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface listProps {
    color?: AppColor
    className?:string,
    lines?: "none" | "full" | "inset" | undefined
    id?: string
}

/**
 * Component designed to store a list of AppItems
 */
const AppList: React.FC<listProps> = (props) => {
    return <IonList {...props} />
};
export default AppList;