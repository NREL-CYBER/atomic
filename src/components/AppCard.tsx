import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import React, { ReactFragment } from 'react';

export type AppColor = "primary" | "secondary" | "favorite" | "tertiary" | "light" | "medium" | "dark" | "clear" | "warning" | "danger" | undefined
interface cardProps {
    title?: ReactFragment
    titleColor?: AppColor
    subTitle?: ReactFragment
    subTitleColor?: AppColor
    id?: string
    onClick?: () => void
}

/**
 * Provides an area with padding, and title
 * put anything and everything in cards for continuity
 */
const AppCard: React.FC<cardProps> = ({ onClick, children, title, titleColor, subTitle, subTitleColor }) => {
    return <IonCard onClick={onClick}>
        <IonCardHeader>
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