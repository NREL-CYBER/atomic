import { AppColor, AppLabel } from "atomic";
import React from "react";

export const AppFormLabel: React.FC<{ name: string, onClick?: () => void, color: AppColor, info?: string, required?: boolean }> = ({ name, color, info, required, onClick }) =>
    <span style={{ minWidth: 200, fontSize: 11 }}>
        <AppLabel color={color}>
            {required && color !== "favorite" && <span style={{ color: "red" }}>*</span>}            {name}
        </AppLabel>
    </span>
