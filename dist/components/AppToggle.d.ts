import React from 'react';
interface toggleProps {
    checked: boolean | undefined;
    onToggleChange?: (value: boolean) => void;
}
/**
 * Component to get booleans from the user
 */
declare const AppToggle: React.FC<toggleProps>;
export default AppToggle;
