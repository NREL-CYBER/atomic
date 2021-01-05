import { IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import AppRoute from '../routing/AppRoute';
import { AppButton, AppRow } from '.';
import AppGrid from './AppGrid';
import { MapRoutes } from './AppRouterOutlet';
import AppToolbar from './AppToolbar';



const StepButton: React.FC<AppRoute> = (step) => {
    const { pathStatusColor, isUnlocked } = useCompletion();
    const currentPath = useAppLayout(x => x.path);
    const statusColor = pathStatusColor(step.path);
    return < AppButton color={currentPath == step.path ? "tertiary" : undefined} fill="clear" disabled={!isUnlocked(step.path)
    } routerLink={step.path}>
        <IonIcon color={statusColor} icon={step.icon} />
        <IonLabel color={statusColor}>{step.title}</IonLabel>
    </AppButton>
}



/**
 * Component show a spinner while something is loading
 */
const AppStepper: React.FC<AppRoute> = (route) => {
    const { nested } = route;
    const history = useHistory()
    const location = useLocation()
    if (nested && !nested.map(p => p.path).includes(location.pathname))
        history.push({ pathname: nested[0].path })
    return <AppGrid>
        <AppRow>
            <AppToolbar color="light">
                {nested && nested.map(step => {
                    return <StepButton key={step.path}  {...step} />
                })}
            </AppToolbar>

            {nested && <IonRouterOutlet>
                <MapRoutes routes={nested} />
            </IonRouterOutlet>}

        </AppRow>
        <AppRow>
        </AppRow>
    </AppGrid >
};
export default AppStepper;