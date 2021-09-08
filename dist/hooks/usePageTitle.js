import create from "zustand";
/**
 */

/**
*  Application Cache status
*/
const usePageTitle = create(set => ({
  title: undefined,
  setTitle: title => {
    set({
      title
    });
  }
}));
export default usePageTitle;