import React from 'react';
import { AppColor, RogueColor } from '../theme/AppColor';
interface titleProps {
    className?: string;
    color?: AppColor;
    colorOverride?: RogueColor;
}
/**
 * A title component for an App item
 */
declare const AppTitle: React.FC<titleProps>;
export default AppTitle;
