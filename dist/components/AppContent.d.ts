import React from 'react';
export declare const ConentScrollBarStyle = "\n::-webkit-scrollbar {\n  width: 9px;\n}\n\n/* Track */\n::-webkit-scrollbar-track {\n  border-radius: 5px;\n}\n\n/* Handle */\n::-webkit-scrollbar-thumb {\n  background: rgb(80,80,80); \n  border-radius: 10px;\n  padding-right:3px;\n}\n\n/* Handle on hover */\n::-webkit-scrollbar-thumb:hover {\n  background: rgb(90,90,90); \n}\n";
/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */
declare const AppContent: React.FC<{
    center?: boolean;
    next?: boolean;
}>;
export default AppContent;
