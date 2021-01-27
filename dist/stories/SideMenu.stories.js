// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { AppSideMenu } from '../components';
import { IonReactHashRouter } from '@ionic/react-router';
import { atOutline, tvOutline } from 'ionicons/icons';
export default {
  title: 'atomic/SideMenu',
  component: AppSideMenu
};

const Template = args => /*#__PURE__*/React.createElement(IonReactHashRouter, null, /*#__PURE__*/React.createElement(AppSideMenu, args));

export const AccordionExample = Template.bind({});
AccordionExample.args = {
  id: "nice",
  root: {
    icon: "",
    path: "/test",
    title: "ok",
    component: () => /*#__PURE__*/React.createElement(React.Fragment, null, "NICE"),
    nested: [{
      icon: atOutline,
      path: "/test/nice",
      title: "ok nice",
      component: () => /*#__PURE__*/React.createElement(React.Fragment, null, "nice")
    }, {
      icon: tvOutline,
      path: "/test/wtf",
      title: "wtf",
      component: () => /*#__PURE__*/React.createElement(React.Fragment, null, "nice")
    }]
  }
};