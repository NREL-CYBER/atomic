import React, { Children } from 'react';
import { AppColor } from '../theme';
import { AppCard } from '.';
import AppProgress from './AppProgress';
import AppItemDivider from './AppItemDivider';

/**
 * Component to show a loading overlay on the application
 */
const AppLoadingCard: React.FC<{ title?: string, color?: AppColor, message?: string }> = ({ children, color = "primary", title = "Loading", message = "" }) =>
    <AppCard title={title} titleColor={color} subTitle={message}>
        <AppItemDivider />
        <AppProgress color={color} />
        <AppItemDivider />
        {children}
    </AppCard>

export default AppLoadingCard;