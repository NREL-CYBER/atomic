import { IonSearchbar } from '@ionic/react';
import React from 'react';


interface selectProps {
    placeholder?: string
    onSearchChange?: (value: string) => void
}

/**
 * Component for a select interface
 */
const AppSearchBar: React.FC<selectProps> = (props) => {
    return <IonSearchbar onIonChange={(e) => {
        props.onSearchChange && props.onSearchChange(e.detail.value!)
    }} {...props} />
};
export default AppSearchBar;