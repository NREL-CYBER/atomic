import { AppButtons, AppCol, AppColor } from "atomic";
import AppButton from "../AppButton";
import React from "react"

export const AppFormLabel: React.FC<{ name: string, onClick?: () => void, color: AppColor, info?: string, required?: boolean }> = ({ name, color, info, required, onClick }) =>
    <span style={{ minWidth: 200 }}>
        <AppButtons slot="start">
            <AppCol size="6">
                <AppButton fill="clear" disabled={typeof onClick === "undefined"} onClick={onClick} color={color}>
                    {name}{required && color !== "favorite" && <span style={{
                        "color": "crimson",
                        left: -7,
                        top: 5,
                        "position": "absolute"
                    } as any} >*</span>}
                </AppButton>
            </AppCol>
        </AppButtons>
    </span>
