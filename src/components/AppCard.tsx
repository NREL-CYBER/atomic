import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';

interface cardProps {
    title?: ReactFragment
    titleColor?: AppColor
    subTitle?: ReactFragment
    subTitleColor?: AppColor
    contentColor?: AppColor
    headerColor?: AppColor
    id?: string
    onClick?: () => void
}

/**
 * Provides an area with padding, and title
 * put anything and everything in cards for continuity
 */
const AppCard: React.FC<cardProps> = ({ onClick, children, title, titleColor, subTitle, subTitleColor, contentColor, headerColor }) => {
    return <IonCard color={contentColor} onClick={onClick}>
        <IonCardHeader color={headerColor}>
            {title && <IonCardTitle color={titleColor}>
                {title}
            </IonCardTitle>}
            {subTitle && <IonCardSubtitle color={subTitleColor}>
                {subTitle}
            </IonCardSubtitle>}
        </IonCardHeader>
        <IonCardContent>
            {children}
        </IonCardContent>
    </IonCard>
};
export default AppCard;