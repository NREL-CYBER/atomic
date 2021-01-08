import React from 'react';
interface rowProps {
    align?: "start" | "end";
    justify?: "start" | "center" | "end";
}
/**
 * Row component, behaves like you expect!
 * controlling alignment and content justification enabled.
 */
declare const AppRow: React.FC<rowProps>;
export default AppRow;
