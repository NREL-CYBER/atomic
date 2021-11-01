import { AppContent } from "../components";
import { AppCollectionInterface } from "../components/AppCollectionInterface";
import { useAddress } from "./ExampleConfig";
export const ExamplePaginationAndSearch = () => {
  return /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppCollectionInterface, {
    showInsert: true,
    store: useAddress
  }));
};