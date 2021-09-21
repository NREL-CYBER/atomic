import { AppBadge, AppButtons, AppCol, AppColor, AppLabel, AppText } from "atomic";
import AppButton from "../AppButton";

export const AppFormLabel: React.FC<{ name: string, onClick?: () => void, color: AppColor, info?: string, required?: boolean }> = ({ name, color, info, required, onClick }) =>
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
