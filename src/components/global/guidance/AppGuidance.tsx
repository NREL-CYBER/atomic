import { AppButtons, AppCard, AppText } from "atomic";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { useGuidance } from "../../../hooks";
import AppButton from "../../AppButton";
import AppIcon from "../../AppIcon";
import AppItem from "../../AppItem";
import AppModal from "../../AppModal";
import AppTitle from "../../AppTitle";

const AppGuidance: React.FC = () => {
    const { guidance, status, dismiss } = useGuidance();
    return <AppModal onDismiss={() => { }} isOpen={status === "open"}>
        <AppItem color="tertiary">
            <AppButtons slot="start">
                <AppTitle>Guidance</AppTitle>
            </AppButtons>
            <AppButtons slot="end" >
                <AppButton fill="clear" onClick={dismiss}>
                    <AppIcon icon={closeOutline} />
                </AppButton>
            </AppButtons>
        </AppItem>
        <AppCard>
            <AppText>
                {guidance}
            </AppText>
        </AppCard>
        <AppItem>
            <AppButtons slot="end" >
                <AppButton onClick={dismiss}>
                    <AppTitle>OK</AppTitle>
                </AppButton>
            </AppButtons>
        </AppItem>
    </AppModal>
}
export default AppGuidance;