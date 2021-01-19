// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import AppAccordion from '../components/AppAccordion';
export default {
  title: 'atomic/Accordion',
  component: AppAccordion,
  argTypes: {
    backgroundColor: {
      control: 'color'
    }
  }
};

const Template = args => /*#__PURE__*/React.createElement(AppAccordion, args);

export const AccordionExample = Template.bind({});
AccordionExample.args = {
  itemColor: "medium",
  selectedColor: "tertiary",
  items: [{
    toolbarContent: () => /*#__PURE__*/React.createElement(React.Fragment, null, "reeds"),
    innerContent: () => /*#__PURE__*/React.createElement(React.Fragment, null, "the thing that makes sound")
  }, {
    toolbarContent: () => /*#__PURE__*/React.createElement(React.Fragment, null, "bellows"),
    innerContent: () => /*#__PURE__*/React.createElement(React.Fragment, null, "the thing that has air in it")
  }, {
    toolbarContent: () => /*#__PURE__*/React.createElement(React.Fragment, null, "keys"),
    innerContent: () => /*#__PURE__*/React.createElement(React.Fragment, null, "the things for melody")
  }]
};