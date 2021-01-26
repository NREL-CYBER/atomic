import React from 'react'; // also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import Validator from 'validator';
import { AppFormComposer } from '../components';
export default {
  title: 'atomic/AppFormComposer',
  component: AppFormComposer
};

const Template = args => /*#__PURE__*/React.createElement(AppFormComposer, args);

const addressSchema = {
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
};

const onSubmit = () => {
  alert("submission valid");
};

const veggieSchema = {
  "$id": "https://example.com/arrays.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A representation of a Grocery List",
  "type": "object",
  "properties": {
    "fruits": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "vegetables": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/veggie"
      }
    }
  },
  "definitions": {
    "veggie": {
      "type": "object",
      "required": ["veggieName", "veggieLike"],
      "properties": {
        "veggieName": {
          "type": "string",
          "description": "The name of the vegetable."
        },
        "veggieLike": {
          "type": "boolean",
          "description": "Do I like this vegetable?"
        }
      }
    }
  }
};
const validator = new Validator(addressSchema);
const veggieValidator = new Validator(veggieSchema);
export const AddressExample = Template.bind({});
AddressExample.args = {
  title: "Address",
  data: {},
  validator,
  requiredOnly: true,
  onSubmit
};
console.log(veggieValidator);
export const VeggieExample = Template.bind({});
VeggieExample.args = {
  title: "Veggie",
  data: {},
  validator: veggieValidator,
  onSubmit
};