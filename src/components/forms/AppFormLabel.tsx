import { AppButtons, AppColor, AppLabel } from "atomic";
import React, { MouseEventHandler } from "react";
import { useMediaQuery } from "../../hooks";

export const AppFormLabel: React.FC<{ name: string, onClick?: MouseEventHandler, color: AppColor, info?: string, required?: boolean }> = ({ name, color, info, required, onClick }) => {
    const isDesktop = useMediaQuery("only screen and (min-width: 500px)");
    return <AppButtons slot="start">
        <span style={{ minWidth: 130, fontSize: 11 }}>
            <AppLabel position={!isDesktop ? "stacked" : undefined} color={color}>
                {required && color !== "favorite" && <span style={{ color: "red" }}>*</span>}            {name}
            </AppLabel>
        </span>
    </AppButtons>
}