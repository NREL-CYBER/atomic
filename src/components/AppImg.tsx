import { IonImg } from '@ionic/react';
import React from 'react';


interface itemProps {
    src: string,
    alt: string,
}

/**
 */
const AppImg: React.FC<itemProps> = (props) => {
    return <IonImg {...props} />
};
export default AppImg;