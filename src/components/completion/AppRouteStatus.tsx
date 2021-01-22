import React, { useEffect } from 'react';
import useCache from '../../hooks/useCache';
import useCompletion, { CompletionConfiguration } from '../../hooks/useCompletion';





/**
 * Manage the availability of routes based on conditions
 */
const AppCompletion: React.FC<CompletionConfiguration> = ({ conditions }) => {
    const cacheIndex = useCache(x => x.index)
    const setCompletion = useCompletion(x => x.setPathState);

    useEffect(() => {
        if (typeof cacheIndex === "undefined") {
            return;
        }
        Object.entries(conditions).forEach(([path, condition]) => {
            setCompletion(path, condition(cacheIndex));
        })
    }, [cacheIndex, conditions, setCompletion]);

    return <></>
};
export default AppCompletion;