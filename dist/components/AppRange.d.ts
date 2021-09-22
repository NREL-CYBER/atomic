import { RangeValue } from '@ionic/core';
import React from 'react';
interface rangeProps {
    min: number;
    max: number;
    pin?: boolean;
    value: RangeValue;
    onValueChange?: (value: number) => {};
    onRangeChange?: (value: {
        lower: number;
        upper: number;
    }) => {};
}
/**
 * Range Slider component, behaves like you expect!
 */
declare const AppRange: React.FC<rangeProps>;
export default AppRange;
