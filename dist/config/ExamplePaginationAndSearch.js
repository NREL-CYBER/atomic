import { AppButtons, AppLabel, AppText } from "atomic";
import { AppCard, AppChip, AppContent, AppItem, AppModal, AppTitle } from "../components";
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
      setActive("");
    }
  }, /*#__PURE__*/React.createElement(AppContent, null, selected && /*#__PURE__*/React.createElement(AppCard, {
    title: selected["name"] || "Relationship"
  }, Object.keys(selected || {}).map((k, i) => /*#__PURE__*/React.createElement(AppItem, {
    key: i
  }, /*#__PURE__*/React.createElement(AppLabel, null, k), typeof selected[k] === 'string' && /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, selected[k]), typeof selected[k] === 'object' && typeof selected[k].map === "function" && /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, selected[k].map(x => /*#__PURE__*/React.createElement(AppChip, null, typeof x === 'string' && /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, x), typeof x === 'object' && /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, Object.values(x)))))))))), /*#__PURE__*/React.createElement(AppPaginatedList, {
    filterCategories: {
      "type": {
        multi: false,
        options: [{
          value: "malware"
        }, {
          value: "attack-pattern"
        }]
      }
    },
    renderItem: ({
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