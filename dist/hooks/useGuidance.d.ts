/**
 * Type that defines what the useGuidance hook can do
 */
declare type GuidanceService = {
    guidance?: string;
    status: "open" | "closed";
    show: () => void;
    setGuidance: (string: string) => void;
    dismiss: () => void;
};
/**
*  Application Guidance
*/
declare const useGuidance: import("zustand").UseStore<GuidanceService>;
export default useGuidance;
