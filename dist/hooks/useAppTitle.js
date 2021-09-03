import create from "zustand";
/**
 */

/**
*  Application Cache status
*/
const useTitle = create(set => ({
  title: "",
  setTitle: title => {
    set({
      title
    });
  }
}));
export default useTitle;