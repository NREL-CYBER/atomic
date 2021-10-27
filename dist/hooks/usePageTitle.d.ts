/**
 */
declare type PageTitleStatus = {
    title: string | undefined;
    setTitle: (title?: string) => void;
};
/**
*  Application Cache status
*/
declare const usePageTitle: import("zustand").UseBoundStore<PageTitleStatus, import("zustand").StoreApi<PageTitleStatus>>;
export default usePageTitle;
