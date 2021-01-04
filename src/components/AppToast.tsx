import React from 'react';
import { AppColor } from './AppCard';
import { IonToast } from '@ionic/react';
import AppRoute from 'core/routing/AppRoute';
import { useHistory } from 'react-router';
import useCompletion from 'hooks/useCompletion';


interface toastProps {
    color?: AppColor
    id: string
    onDismiss: (id: string) => void
    message: string
    path?: string
}

/**
 * A title component for an Toast item
 */
const AppToast: React.FC<toastProps> = (props) => {
    const history = useHistory();
    const { path } = props;
    const { pathStatusColor } = useCompletion();
    return <IonToast color={path ? pathStatusColor(path) : "medium"} animated={true} buttons={props.path ? [{
        text: "Go", handler: () => {
            history.push({ pathname: props.path });
        }
    }] : []} position="bottom" duration={3000} onDidDismiss={() => { props.onDismiss(props.id) }} isOpen={true} {...props} />
};
export default AppToast;