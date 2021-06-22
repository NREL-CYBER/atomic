import React from 'react';
import { AppColor } from '../theme';
import { AppCard } from '.';
import AppProgress from './AppProgress';

/**
 * Component to show a loading overlay on the application
 */
const AppLoadingCard: React.FC<{ title?: string, color?: AppColor, message?: string }> = ({ color = "primary", title = "Loading", message = "" }) =>
    <AppCard title={title} titleColor={color} subTitle={message}>
        <AppProgress color={color} />
    </AppCard>

export default AppLoadingCard;