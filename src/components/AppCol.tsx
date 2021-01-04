import { IonCol } from '@ionic/react';
import React from 'react';
import { AppColor } from './AppCard';


interface itemProps {
    size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
    sizeMd?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
    sizeLg?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
    sizeXs?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
    color?: AppColor
}

/**
 * Column in a Grid, use this for splitting a page into multiple column layout
 * page size is 12
 */
const AppCol: React.FC<itemProps> = (props) => {
    return <IonCol {...props} />
};
export default AppCol;