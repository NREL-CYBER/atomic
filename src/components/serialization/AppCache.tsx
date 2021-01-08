import React, { FC, useEffect } from "react";
import { AppCacheConfig } from "../../state/AppCache";
import useCache from "../../hooks/useCache";
import { composeStore } from "store";


const AppCache: FC<AppCacheConfig> = ({ schemas }) => {
    const registerCollection = useCache(x => x.register);
    useEffect(() => {
        schemas.forEach((schema) => {
            const { definitions } = schema;
            definitions && Object.keys(definitions).forEach((definition) => {
                registerCollection(definition, composeStore(schema, definition))
            })
        })
    }, [registerCollection, schemas])
    return <>
    </>
}
export default AppCache;