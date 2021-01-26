import rootRoute from "./routes";
import { composeStore } from "store";
const AddressSchema = {
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A simple Address",
  "title": "Address",
  "$comment": "~",
  "type": "object",
  "properties": {
    "post_office_box": {
      "type": "string"
    },
    "extended_address": {
      "type": "string"
    },
    "street_address": {
      "type": "string"
    },
    "locality": {
      "type": "string"
    },
    "region": {
      "type": "string"
    },
    "country_name": {
      "type": "string"
    }
  },
  "required": ["locality", "region", "country_name"]
};
const ExampleConfig = {
  routes: [rootRoute],
  sections: {
    forms: rootRoute.nested
  },
  cache: {
    index: {
      test: {
        addresses: composeStore(AddressSchema)
      }
    }
  }
};
export default ExampleConfig;