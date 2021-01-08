import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import React from 'react';

/**
 * Provides an area with padding, and title
 * put anything and everything in cards for continuity
 */
const AppCard = ({
  onClick,
  children,
  title,
  titleColor,
  subTitle,
  subTitleColor
}) => {
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
    </IonCard>;
};

export default AppCard;