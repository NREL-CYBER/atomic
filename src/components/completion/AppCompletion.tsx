import { useAppLayout } from 'atomic';
import React, { useEffect } from 'react';
import useCompletion, { } from '../../hooks/useCompletion';
import { AppConfig } from '../../util';





/**
 * Manage the availability of routes based on conditions
 */
const AppCompletion: React.FC<{ config: AppConfig }> = ({ config }) => {
    const setPathState = useCompletion(x => x.setPathState);
    const routes = useAppLayout(x => x.allRoutesFlattened)
    useEffect(() => {
        if (typeof config.completion === "undefined") {
            routes.forEach(({ path }) => {
                setPathState(path, "unlocked")
            })
        } else if (config.completion && config.completion.default) {
            routes.forEach(({ path }) => {
                setPathState(path, config.completion!.default as any)
            })
        }
    }, [config.completion, routes, setPathState]);

    return <></>
};
export default AppCompletion;