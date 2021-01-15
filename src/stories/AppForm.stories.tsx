import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Validator, { RootSchemaObject } from 'validator';
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

interface Address {
  "post-office-box": string,
  "extended-address": string,
  "street-address": string,
  "locality": string,
  "region": string
  "postal-code": string
  "country-name": string
}

const addressSchema: RootSchemaObject = {
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A simple address Object with dependencies",
  $comment: "OK NICE",
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
}
const onSubmit = () => {
  alert("submission valid");
}
const validator = new Validator(addressSchema);

export const AddressWithDependencies = Template.bind({});
AddressWithDependencies.args = {
  data: {},
  validator,
  onSubmit,
}
