/* eslint-disable react-hooks/exhaustive-deps */
import { helpOutline } from "ionicons/icons";
import React, { useMemo, useState } from "react";
import { AppButtons, AppCard, AppIcon, AppText } from ".";
import { CompletionStatus } from "../hooks/useCompletion";
import AppButton from "./AppButton";
import AppToolbar from "./AppToolbar";
import AppProgress from "./AppProgress";




/**
 * The root Sequence.
 */
export interface Sequence {
    guidance?: string;
    title: string;
    elements?: SequenceElement[]
}
export interface SequenceElement extends Sequence {
    component: React.FC<{ onStatusChange: (status: CompletionStatus) => void }>
}



export interface appSequenceProps { sequence: Sequence, onNext: () => void, onBack: () => void }

const AppSequence: React.FC<appSequenceProps> = ({ sequence, onBack, onNext }) => {
    const { elements } = sequence;
    const [activeElementIndex, setActiveElementIndex] = useState<number>(0);
    const activeSequenceElement = elements && elements[activeElementIndex]
    const { title, guidance } = activeSequenceElement || { title: "Complete", guidance: sequence.guidance };
    const [showGuidance, setShowGuidance] = useState(false);
    const [status, setActiveElementStatus] = useState<CompletionStatus>("locked");
    const sequenceComplete = onNext;
    const previousSequence = onBack;

    const SequenceElementInfo: React.FC = () =>
        < AppToolbar>
            <AppButtons slot="start">
                <AppText>
                    {title}
                </AppText>
            </AppButtons>
            <AppButtons slot="end">
                < AppButton fill="clear" onClick={() => { setShowGuidance(x => !x) }}>
                    <AppIcon icon={helpOutline}></AppIcon>
                </AppButton>
            </AppButtons>
        </AppToolbar >

    const SequenceElementNavigation: React.FC<{ onNext: () => void, onBack: () => void }> = ({ children, onNext, onBack }) => <>
        {children}
        < AppToolbar >
            < AppButtons slot="end">
                {elements && activeElementIndex < elements.length - 1 ? <AppButton color={status !== "locked" ? "primary" : "medium"} disabled={status === "locked"} onClick={onNext}>
                    Next
                </AppButton> : <AppButton onClick={sequenceComplete}>
                        Complete
                    </AppButton>}
            </AppButtons>
            <AppButtons slot="start">
                {elements && activeElementIndex !== 0 ? <AppButton onClick={onBack}>
                    Back
                </AppButton> : <AppButton onClick={previousSequence}>
                        Previous
                    </AppButton>}

            </AppButtons>
        </AppToolbar >
    </ >

    const nextSequenceElement = () => setActiveElementIndex(x => x + 1);
    const previousSequenceElement = () => setActiveElementIndex(x => x - 1);

    const onStatusChange = (status: CompletionStatus) => {
        setActiveElementStatus(status);
    }
    const ActiveSequenceComponent = activeSequenceElement && activeSequenceElement.component ?
        () => activeSequenceElement.component({ onStatusChange }) : () => <AppText></AppText>

    return <AppCard title={sequence.title}>
        {useMemo(() => <>
            <SequenceElementInfo />
        </>, [activeElementIndex])}
        {showGuidance && <pre style={{ whiteSpace: "pre-wrap" }}>{guidance}</pre>}
        {useMemo(() => <>
            <ActiveSequenceComponent />
        </>, [activeElementIndex])}

        {useMemo(() =>
            <SequenceElementNavigation
                onBack={previousSequenceElement}
                onNext={nextSequenceElement} />,
            [status, activeElementIndex])}
        {elements && <AppProgress color="success" value={activeElementIndex / elements.length} />}
    </AppCard>

}


export default AppSequence