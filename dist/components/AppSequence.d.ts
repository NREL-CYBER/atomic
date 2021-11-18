import React from "react";
import { CompletionStatus } from "../hooks/useCompletion";
/**
 * The root Sequence.
 */
export interface Sequence {
    guidance?: string;
    title: string;
    elements?: SequenceElement[];
}
export interface SequenceElement extends Sequence {
    component: React.FC<{
        onStatusChange: (status: CompletionStatus) => void;
    }>;
    autoNext?: boolean;
}
export interface appSequenceProps {
    sequence: Sequence;
    onNext?: () => void;
    onBack?: () => void;
}
declare const AppSequence: React.FC<appSequenceProps>;
export default AppSequence;
