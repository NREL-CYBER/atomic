import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';
interface cardProps {
    title?: ReactFragment;
    titleColor?: AppColor;
    subTitle?: ReactFragment;
    subTitleColor?: AppColor;
    id?: string;
    onClick?: () => void;
}
/**
 * Provides an area with padding, and title
 * put anything and everything in cards for continuity
 */
declare const AppCard: React.FC<cardProps>;
export default AppCard;