import create from "zustand";



/**
 */
type TitleStatus = {
    title: string | undefined,
    setTitle: (title?: string) => void
}

/**
*  Application Cache status
*/
const useTitle = create<TitleStatus>((set) => ({
    title: "",
    setTitle: (title) => {
        set({ title })
    }
}));
export default useTitle;