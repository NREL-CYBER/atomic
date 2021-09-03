/**
 */
declare type TitleStatus = {
    title: string | undefined;
    setTitle: (title?: string) => void;
};
/**
*  Application Cache status
*/
declare const useTitle: import("zustand").UseStore<TitleStatus>;
export default useTitle;
