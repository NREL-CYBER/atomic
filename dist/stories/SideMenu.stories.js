// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { AppSideMenu, AppContent, AppCard } from '../components';
import { IonReactHashRouter } from '@ionic/react-router';
import { atOutline, tvOutline } from 'ionicons/icons';
export default {
  title: 'atomic/SideMenu',
  component: AppSideMenu
};

const Template = args => /*#__PURE__*/React.createElement(IonReactHashRouter, null, /*#__PURE__*/React.createElement(AppSideMenu, args));

export const SideMenuExample = Template.bind({});
SideMenuExample.args = {
  id: "nice",
  root: {
    icon: "",
    path: "/",
    title: "ok",
    component: () => /*#__PURE__*/React.createElement(AppContent, {
      center: true
    }, /*#__PURE__*/React.createElement(AppCard, {
      titleColor: "danger",
      headerColor: "tertiary",
      contentColor: "primary",
      title: "OK"
    })),
    nested: [{
      icon: atOutline,
      path: "/test/nice",
      title: "ok nice",
      component: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return /*#__PURE__*/React.createElement(AppContent, {
          center: true
        }, "nice");
      }
    }, {
      icon: tvOutline,
      path: "/test/wtf",
      title: "wtf",
      component: () => /*#__PURE__*/React.createElement(React.Fragment, null, "nice")
    }]
  }
};