import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Validator from 'validator';
import { AppFormComposer } from '../components';
import { formComposerProps } from '../components/forms/AppFormComposer';

export default {
  title: 'FormComposer',
  component: AppFormComposer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<formComposerProps> = (args) => <AppFormComposer {...args} />;


const validator = new Validator({
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "An address similar to http://microformats.org/wiki/h-card",
  "type": "object",
  "properties": {
    "post-office-box": {
      "type": "string"
    },
    "extended-address": {
      "type": "string"
    },
    "street-address": {
      "type": "string"
    },
    "locality": {
      "type": "string"
    },
    "region": {
      "type": "string"
    },
    "postal-code": {
      "type": "string"
    },
    "country-name": {
      "type": "string"
    }
  },
  "required": ["locality", "region", "country-name"],
  "dependencies": {
    "post-office-box": ["street-address"],
    "extended-address": ["street-address"]
  }
});
const onSubmit = () => {
  alert("submission valid");
}
const data = {};
export const AddressWithDependencies = Template.bind({
  validator, onSubmit, data
});