// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import AppRoot from '../components/AppRoot';
import ExampleConfig from '../config/ExampleConfig';
export default {
  title: 'atomic/AppExample',
  component: AppRoot
};

const Template = args => /*#__PURE__*/React.createElement(AppRoot, args);

export const AppExample = Template.bind({});
AppExample.args = ExampleConfig;