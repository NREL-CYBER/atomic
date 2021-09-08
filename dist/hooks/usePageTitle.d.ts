/**
 */
declare type PageTitleStatus = {
    title: string | undefined;
    setTitle: (title?: string) => void;
};
/**
*  Application Cache status
*/
declare const usePageTitle: import("zustand").UseStore<PageTitleStatus>;
export default usePageTitle;
