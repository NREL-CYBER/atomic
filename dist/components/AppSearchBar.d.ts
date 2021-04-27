import React from 'react';
interface searchProps {
    placeholder?: string;
    onQuery?: (query: string) => void;
    value?: string;
}
/**
 * Component for a search interface
 */
declare const AppSearchBar: React.FC<searchProps>;
export default AppSearchBar;
