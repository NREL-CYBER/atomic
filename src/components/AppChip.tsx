import { IonChip } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface chipProps {
    color?: AppColor
    className?: string
    onClick?: () => void
    style?: Record<string, any>
}

/**
 * Chip Element! 
 */
const AppChip: React.FC<chipProps> = (props) => {
    return <IonChip {...props} />
};
export default AppChip;