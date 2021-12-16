import { AppAccordion, AppCol, AppRow, AppSequence, AppTitle } from '../components';
import { listOutline, peopleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppForm, AppInput, AppItem, AppItemDivider, AppLabel, AppPage, AppRouteCard, AppSelect, AppSelectButtons, AppSelectOption, AppTabs } from '../components';
import AppSuggestedInput from '../components/forms/AppSuggestedInput';
import { AppTable } from '../components/global/AppTable';
import { useCompletion } from '../hooks';
import usePageTitle from '../hooks/usePageTitle';
import { palletSchema } from '../schemas/pallete.schema';
import { VisualizeValue } from '../components/AppJsonDisplay';

const Home = () => {
  const [platform, setPlatform] = useState("Develop");
  const [val, setVal] = useState([]);
  const [medal, setMedal] = useState("");
  const {
    setTitle
  } = usePageTitle();
  useEffect(() => {
    setTitle("Awesome");
  }, [setTitle]);
  const {
    setPathState
  } = useCompletion();
  useEffect(() => {
    setPathState("/form", "unlocked");
  }, [setPathState]);
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, {
    next: true
  }, /*#__PURE__*/React.createElement(AppCard, null, /*#__PURE__*/React.createElement(VisualizeValue, {
    value: {
      "uuid": "1c6d044c-ee2f-4f4a-89b2-a66dbeca5404",
      "metadata": {
        "title": "System Security Plan",
        "last_modified": "2021-11-22T15:31:08.236Z",
        "version": "0.0.0",
        "oscal_version": "1.0.0"
      },
      "import_profile": {
        "href": "HTTPS://Google.com"
      },
      "system_characteristics": {
        "system_ids": ["NICE"],
        "system_name": "TEST",
        "description": "YEAH",
        "security_sensitivity_level": "",
        "system_information": {
          "information_types": []
        },
        "security_impact_level": {
          "security_objective_confidentiality": "",
          "security_objective_integrity": "",
          "security_objective_availability": ""
        },
        "status": {
          "state": ""
        },
        "authorization_boundary": {
          "description": ""
        }
      },
      "system_implementation": {
        "users": [{
          nice: "ok"
        }],
        "components": [{
          nice: "ok",
          "yeah": "nice"
        }]
      },
      "control_implementation": {
        "description": "",
        "implemented_requirements": []
      },
      "back_matter": {
        "resources": []
      }
    },
    propertyInfo: {}
  })), /*#__PURE__*/React.createElement(AppAccordion, {
    items: [{
      innerContent: /*#__PURE__*/React.createElement(AppTitle, null, "NICEPLPLPL"),
      toolbarContent: /*#__PURE__*/React.createElement(AppRow, null, "OUTTER")
    }]
  }), /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "tertiary",
    titleColor: "secondary",
    title: "Welcome to atomic",
    subTitle: "atomic"
  }, /*#__PURE__*/React.createElement(AppChip, {
    color: "success"
  }, "Check out the examples to get started"), /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppTable, {
    data: [{
      uuid: v4(),
      name: "test"
    }, {
      uuid: v4(),
      name: 'test'
    }],
    columns: ['name', 'uuid']
  })), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppSequence, {
    sequence: {
      title: "A",
      elements: []
    }
  }))), /*#__PURE__*/React.createElement(AppInput, {
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
  })))), /*#__PURE__*/React.createElement(AppTabs, {
    height: 600,
    slot: "bottom",
    selectedTab: "tab2",
    tabs: [{
      icon: listOutline,
      path: "tab1",
      title: "Tab 1",
      component: () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppForm, {
        data: {},
        onSubmit: () => {},
        rootSchema: palletSchema,
        objectSchema: palletSchema.definitions.pallete_element
      }))
    }, {
      icon: peopleOutline,
      path: "tab2",
      title: "Tab 2",
      component: () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppRouteCard, {
        icon: "",
        path: "/Form",
        title: "form"
      }))
    }]
  })));
};

export default Home;