import React, { FC } from "react";
import { helpBuoyOutline } from "ionicons/icons";
import useGuidance from "../../hooks/useGuidance";
import useCompletion from "../../hooks/useCompletion";
import AppPopover from "../AppPopover";
import { AppCard, AppRow, AppButton } from "..";

const Guide: FC = () => {
    const { guidance, status, dismiss } = useGuidance();
    const { isUnlocked, latestUnockedPath, pathStatusColor } = useCompletion();

    return <AppPopover onDismiss={() => dismiss()} isOpen={status === "open"} >
        <AppCard title="Greetings! Lets pick up where you left off...">
            <AppRow>
                {guidance}
            </AppRow>
            <AppRow>
                <AppButton routerLink={latestUnockedPath()} expand="full" color="favorite" fill="outline" onClick={() => dismiss()}>
                    Continue
        </AppButton>
            </AppRow>
        </AppCard>
    </AppPopover>
}
export default Guide;