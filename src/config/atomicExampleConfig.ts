import { AppConfig } from "../util/AppConfig";
import rootRoute from "./routes";
import { composeStore } from "store"
import { RootSchemaObject } from "validator";


const AddressSchema: RootSchemaObject = {
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
}
type Address = {
    post_office_box?: string
    street_address?: string
    locality: string
    region: string
    country_name: string
}


const config: AppConfig = {
    routes: [rootRoute],
    sections: { forms: rootRoute.nested },
    cache: {
        index: {
            test: {
                addresses: composeStore<Address>(AddressSchema)
            }
        }
    }

}
export default config;