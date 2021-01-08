import React, { FC } from "react";
import { AppButton, AppCard, AppRow } from "..";
import useCompletion from "../../hooks/useCompletion";
import useGuidance from "../../hooks/useGuidance";
import AppPopover from "../AppPopover";

const Guide: FC = () => {
    const { guidance, status, dismiss } = useGuidance();
    const { latestUnockedPath } = useCompletion();

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