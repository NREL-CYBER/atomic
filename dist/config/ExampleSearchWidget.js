import { AppItem, AppList } from "../components";
export const ExampleSearchWidget = ({
  query,
  dismiss
}) => {
  return /*#__PURE__*/React.createElement(AppList, null, /*#__PURE__*/React.createElement(AppItem, {
    routerLink: "/form",
    onClick: dismiss
  }, "Form"));
};