import { IonGrid } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';
import { ConentScrollBarStyle } from './AppContent';


interface gridProps {
}

/**
 * Component to house a grid of AppCol and AppRow
 * you can do AppCol or AppRow first depending on your context
 * anything is possible!
 */
const AppGrid: React.FC<gridProps> = (props) => {
    const gridRef = useRef<HTMLIonGridElement>(null)
    useLayoutEffect(() => {
        const styles = document.createElement('style');
        styles.textContent = ConentScrollBarStyle;
        gridRef.current?.shadowRoot?.appendChild(styles);
    }, [gridRef.current?.shadowRoot, gridRef])

    return <IonGrid ref={gridRef} {...props} />
}



export default AppGrid;