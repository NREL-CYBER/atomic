import { IonSearchbar } from '@ionic/react';
import React from 'react';


interface searchProps {
    placeholder?: string
    onQuery?: (query: string) => void
    value?: string,
}

/**
 * Component for a search interface
 */
const AppSearchBar: React.FC<searchProps> = (props) => {
    return <IonSearchbar debounce={200} onIonChange={(e) => {
        props.onQuery && props.onQuery(e.detail.value!)
    }} {...props} />
};
export default AppSearchBar;