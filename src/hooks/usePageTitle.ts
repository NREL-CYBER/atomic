import create from "zustand";



/**
 */
type PageTitleStatus = {
    title: string | undefined,
    setTitle: (title?: string) => void
}

/**
*  Application Cache status
*/
const usePageTitle = create<PageTitleStatus>((set) => ({
    title: undefined,
    setTitle: (title) => {
        set({ title })
    }
}));
export default usePageTitle;