import React from 'react';
import { AppColor } from '../theme';
/**
 * Component to show a loading overlay on the application
 */
declare const AppLoadingCard: React.FC<{
    title?: string;
    color?: AppColor;
    message?: string;
}>;
export default AppLoadingCard;
