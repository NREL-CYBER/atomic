import React, { useEffect, useState } from "react";
import Validator from "validator";
import { AppLoadingCard } from "..";
import AppForm, { formComposerProps } from "./AppForm";
import useappFormDefinitionValidatorCache from "./useAppFormDefinitionCache";


/**
 * 
 *  
 */
const AppFormComposer: React.FC<formComposerProps> = ({ lazyLoadValidator, definition, ...props }) => {
    const [validator, setValidator] = useState<Validator<unknown> | undefined>()
    const { lazyLoadDefinitionValidator } = useappFormDefinitionValidatorCache();
    useEffect(() => {
        lazyLoadValidator().then((warmValidator) => {
            if (typeof definition !== "undefined") {
                console.log(warmValidator, "dv")
                lazyLoadDefinitionValidator(warmValidator, definition).then((warmDefinitionValidator) => {
                    console.log(warmDefinitionValidator, "s");
                    setValidator(warmDefinitionValidator)
                })
            } else {
                setValidator(warmValidator)
            }
        })
    }, [definition, lazyLoadDefinitionValidator, lazyLoadValidator, validator]);

    if (typeof validator === "undefined" || typeof validator.schema === "undefined") {
        const title = props.title;
        const loadingtitle = "Loading " + title || " " + definition || "..."
        return <AppLoadingCard title={loadingtitle
        } message="Loading.... " color={"favorite"} />
    } else {
        return <AppForm validator={validator} {...props} />
    }
}
export default AppFormComposer