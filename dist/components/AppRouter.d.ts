import React from 'react';
interface appRouterProps {
    id: string;
    animated?: boolean;
}
/**
 * Component for routing root pages
 */
declare const AppRouter: React.FC<React.PropsWithChildren<appRouterProps>>;
export default AppRouter;
