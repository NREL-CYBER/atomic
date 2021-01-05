import create from "zustand";


/**
 * Type that defines what the useGuidance hook can do
 */
type GuidanceService = {
    guidance?: string
    status: "open" | "closed"
    show: () => void
    setGuidance: (string: string) => void
    dismiss: () => void
}

/**
*  Application Guidance 
*/
const useGuidance = create<GuidanceService>((set) => {
    return ({

        status: "closed",
        setGuidance: (guidance) => {
            set({ guidance });
        },
        show: () => {
            set({ status: "open" })
        },
        dismiss: () => {
            set({ status: "closed" })
        },
        notices: [],

    })
});
export default useGuidance;