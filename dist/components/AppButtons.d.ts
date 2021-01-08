import React from 'react';
interface buttonsProps {
    slot?: "start" | "end";
}
/**
 * Buttons Component allows for specific button placements on an App Item
 *
 * @example <AppItem><AppButtons slot="start">Left aligned button<AppButtons/><AppItem/>
 *
 */
declare const AppButtons: React.FC<buttonsProps>;
export default AppButtons;
