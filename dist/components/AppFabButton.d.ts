import React, { MouseEventHandler } from 'react';
interface itemProps {
    onClick?: MouseEventHandler;
    disabled?: boolean;
}
/**
* Floating action button, put this inside an AppFab
*/
declare const AppFabButton: React.FC<itemProps>;
export default AppFabButton;
