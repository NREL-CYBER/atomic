import { useEffect } from "react";
import React from "react";

const AppSerializer = ({
  cache
}) => {
  useEffect(() => {
    Object.entries(cache.storage).forEach(([collection, store]) => {
      console.log("Watching " + collection);
    });
  }, [cache.storage]);
  return <>
    </>;
};

export default AppSerializer;