import { AppItem, AppLabel, AppText } from "atomic";
import React from "react"
export const AppFormErrorsItem: React.FC<{ errors?: string[] }> = ({ errors }) =>
    errors && errors.length > 0 ? <AppItem>
        <AppLabel position='stacked' color='danger'>
            {errors.map((error, i) => <AppText key={i}>
                {error}
            </AppText>)}
        </AppLabel>
    </AppItem> : <></>

