import { listOutline, peopleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppInput, AppItem, AppItemDivider, AppLabel, AppPage, AppSelect, AppSelectButtons, AppSelectOption, AppTabs } from '../components';
import AppSuggestedInput from '../components/forms/AppSuggestedInput';

const Home = () => {
  const [platform, setPlatform] = useState("Develop");
  const [val, setVal] = useState([]);
  const [medal, setMedal] = useState("");
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, {
    next: true
  }, /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "primary",
    titleColor: "secondary",
    title: "Welcome to atomic",
    subTitle: "atomic"
  }, /*#__PURE__*/React.createElement(AppTabs, {
    height: 200,
    slot: "bottom",
    selectedTab: "tab1",
    tabs: [{
      icon: listOutline,
      path: "tab1",
      title: "Tab 1",
      component: () => /*#__PURE__*/React.createElement("div", null, "This is a tab")
    }, {
      icon: peopleOutline,
      path: "tab2",
      title: "Tab 2",
      component: () => /*#__PURE__*/React.createElement(React.Fragment, null, "This is another tab")
    }]
  }), /*#__PURE__*/React.createElement(AppChip, {
    color: "success"
  }, "Check out the examples to get started"), /*#__PURE__*/React.createElement(AppInput, {
    debounce: 500,
    onInputChange: () => {
      console.log("change");
    },
    onInputBlur: () => {
      console.log("blur");
    }
  }), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppChip, null, "AppColors"), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "primary"
  }, "Primary"), /*#__PURE__*/React.createElement(AppItem, {
    color: "secondary"
  }, "Secondary"), /*#__PURE__*/React.createElement(AppItem, {
    color: "tertiary"
  }, "Tertiary"), /*#__PURE__*/React.createElement(AppItem, {
    color: "success"
  }, "Success"), /*#__PURE__*/React.createElement(AppItem, {
    color: "warning"
  }, "Warning")), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "favorite"
  }, "Favorite"), /*#__PURE__*/React.createElement(AppItem, {
    color: "danger"
  }, "Danger"), /*#__PURE__*/React.createElement(AppItem, {
    color: "light"
  }, "Light"), /*#__PURE__*/React.createElement(AppItem, {
    color: "dark"
  }, "Dark"), /*#__PURE__*/React.createElement(AppItem, {
    color: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement(AppItem, {
    color: "paper"
  }, "Paper")), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    routerLink: "/form",
    color: "primary",
    fill: "solid"
  }, "Form Example")), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppLabel, null, "AppSelectButtons")), /*#__PURE__*/React.createElement(AppSelectButtons, {
    multi: true,
    buttons: [{
      text: "multiple",
      value: "M",
      color: "primary"
    }, {
      text: "choice",
      value: "C",
      color: "favorite"
    }, {
      text: "selections",
      value: "S",
      color: "secondary"
    }],
    selected: val,
    onSelectionChange: value => {
      console.log(value);
      setVal(value);
    }
  })), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, null, "App Datalist input"), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppSuggestedInput, {
    value: medal,
    id: "test",
    values: ["gold", "silver", "bronze"],
    onInputChange: freshMedal => {
      setMedal(freshMedal);
    }
  }))), /*#__PURE__*/React.createElement(AppItemDivider, null), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, null, "AppSelect"), /*#__PURE__*/React.createElement(AppSelect, {
    onSelectionChange: setPlatform,
    value: platform,
    color: typeof val === "undefined" ? "warning" : "success",
    placeholder: "Environment"
  }, /*#__PURE__*/React.createElement(AppSelectOption, {
    value: "Development"
  }), /*#__PURE__*/React.createElement(AppSelectOption, {
    value: "Production"
  }))))));
};

export default Home;