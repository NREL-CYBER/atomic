import React, { useEffect } from 'react';
import useCache from '../../hooks/useCache';
import useCompletion from '../../hooks/useCompletion';
/**
 * Manage the availability of routes based on conditions
 */

const AppCompletion = ({
  conditions
}) => {
  const cacheIndex = useCache(x => x.index);
  const setCompletion = useCompletion(x => x.setPathState);
  useEffect(() => {
    if (typeof cacheIndex === "undefined") {
      return;
    }

    Object.entries(conditions).forEach(([path, condition]) => {
      setCompletion(path, condition(cacheIndex));
    });
  }, [cacheIndex, conditions, setCompletion]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default AppCompletion;