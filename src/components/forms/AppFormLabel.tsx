import { AppButtons, AppColor, AppLabel } from "atomic";
import React, { MouseEventHandler } from "react";

export const AppFormLabel: React.FC<{ name: string, onClick?: MouseEventHandler, color: AppColor, info?: string, required?: boolean }> = ({ name, color, info, required, onClick }) =>
    <AppButtons slot="start">
        <span style={{ minWidth: 200, fontSize: 11 }}>
            <AppLabel color={color}>
                {required && color !== "favorite" && <span style={{ color: "red" }}>*</span>}            {name}
            </AppLabel>
        </span>
    </AppButtons>
