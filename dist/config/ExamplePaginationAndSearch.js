import { AppButtons, AppLabel, AppText } from "atomic";
import { AppChip, AppContent, AppModal, AppTitle, AppItem, AppCard } from "../components";
import { AppPaginatedList } from "../components/AppPaginatedList";
import { useAttack } from "./ExampleConfig";
export const ExamplePaginationAndSearch = () => {
  const {
    setActive,
    activeInstance
  } = useAttack();
  const selected = activeInstance();
  return /*#__PURE__*/React.createElement(AppContent, {
    center: true
  }, /*#__PURE__*/React.createElement(AppModal, {
    smol: true,
    isOpen: typeof selected !== 'undefined',
    onDismiss: () => {
      setActive(undefined);
    }
  }, /*#__PURE__*/React.createElement(AppCard, null, Object.keys(selected || {}).map(k => /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, null, k), typeof selected[k] === 'string' && /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, selected[k]))))), /*#__PURE__*/React.createElement(AppPaginatedList, {
    render: ({
      item
    }) => {
      return /*#__PURE__*/React.createElement(AppItem, {
        href: "javascript:void",
        onClick: () => {
          setActive(item.id);
        }
      }, /*#__PURE__*/React.createElement(AppButtons, {
        slot: "start"
      }, /*#__PURE__*/React.createElement(AppTitle, null, item.name || item.relationship_type)), /*#__PURE__*/React.createElement(AppButtons, {
        slot: "end"
      }, /*#__PURE__*/React.createElement(AppChip, null, item.type)));
    },
    store: useAttack
  }));
};