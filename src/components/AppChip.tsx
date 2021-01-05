import { IonChip } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface itemProps {
    color?: AppColor
    className?: string
    onClick?: () => void
}

/**
 * Chip Element! 
 */
const AppChip: React.FC<itemProps> = (props) => {
    return <IonChip {...props} />
};
export default AppChip;