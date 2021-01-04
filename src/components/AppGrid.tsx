import { IonGrid } from '@ionic/react';
import React from 'react';


interface gridProps {
}

/**
 * Component to house a grid of AppCol and AppRow
 * you can do AppCol or AppRow first depending on your context
 * anything is possible!
 */
const AppGrid: React.FC<gridProps> = (props) =>
    <IonGrid {...props} />


export default AppGrid;