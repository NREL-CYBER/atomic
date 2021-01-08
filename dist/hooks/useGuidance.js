import create from "zustand";
/**
 * Type that defines what the useGuidance hook can do
 */

/**
*  Application Guidance 
*/
const useGuidance = create(set => {
  return {
    status: "closed",
    setGuidance: guidance => {
      set({
        guidance
      });
    },
    show: () => {
      set({
        status: "open"
      });
    },
    dismiss: () => {
      set({
        status: "closed"
      });
    },
    notices: []
  };
});
export default useGuidance;