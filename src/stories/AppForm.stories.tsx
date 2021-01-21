import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Validator, { RootSchemaObject } from 'validator';
import { AppFormComposer } from '../components';
import { formComposerProps } from '../components/forms/AppFormComposer';

export default {
  title: 'atomic/AppFormComposer',
  component: AppFormComposer,
} as Meta;

const Template: Story<formComposerProps> = (args) => <AppFormComposer {...args} />;

interface Address {
  "post-office-box": string,
  "locality": string,
  "region": string
  "postal-code": string
  "country-name": string
}

const addressSchema: RootSchemaObject = {
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A simple Address",
  "title": "Address",
  "$comment": "~",
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
  "required": ["locality", "region", "country-name"]
}
const onSubmit = () => {
  alert("submission valid");
}
const validator = new Validator(addressSchema);

export const AddressExample = Template.bind({});
AddressExample.args = {
  title: "Address",
  data: {},
  validator,
  requiredOnly: true,
  onSubmit,
}
