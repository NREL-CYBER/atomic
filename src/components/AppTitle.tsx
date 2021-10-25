import { IonTitle } from '@ionic/react';
import React from 'react';
import { AppColor, RogueColor, rogueColorToStyle } from '../theme/AppColor';


interface titleProps {
    className?: string
    color?: AppColor
    colorOverride?: RogueColor
}

/**
 * A title component for an App item
 */
const AppTitle: React.FC<titleProps> = (props) => {
    return <IonTitle style={props.colorOverride ? rogueColorToStyle(props.colorOverride) : {}}  {...props} />
};
export default AppTitle;