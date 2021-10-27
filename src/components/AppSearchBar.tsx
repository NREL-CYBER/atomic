import { IonSearchbar } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';


interface searchProps {
    placeholder?: string
    focus?: boolean,
    onQuery?: (query: string) => void
    value?: string,
    debounce?: number
}

/**
 * Component for a search interface
 */
const AppSearchBar: React.FC<searchProps> = (props) => {
    const searchRef = useRef<HTMLIonSearchbarElement>(null)
    useLayoutEffect(() => {
        setTimeout(() => {
            searchRef.current && props.focus && searchRef.current.setFocus()
        }, props.debounce || 100)
    }, [props.debounce, props.focus, searchRef])
    return <IonSearchbar ref={searchRef} debounce={props.debounce || 100} onIonChange={(e) => {
        props.onQuery && props.onQuery(e.detail.value!)
    }} {...props} />
};
export default AppSearchBar;