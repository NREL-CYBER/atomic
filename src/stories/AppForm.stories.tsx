import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Validator, { RootSchemaObject } from 'validator';
import { AppForm } from '../components';
import { formComposerProps } from '../components/forms/AppForm';

export default {
    title: 'atomic/AppForm',
    component: AppForm,
} as Meta;

const Template: Story<formComposerProps> = (args) => <AppForm {...args} />;

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
            "type": "string",
            "enum": [
                "80401",
                "90218",
                "8888"]
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



const veggieSchema = {
    "$id": "https://example.com/arrays.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "A representation of a Grocery List",
    "title": "Produce ",
    "type": "object",
    "properties": {
        "fruits": {
            "type": "array",
            "items": {
                "title": "fruit",
                "description": "is a fruit by any other name as sweet?",
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
            "title": "Veggie",
            "description": "Part of a balanced lunch",
            "required": ["name", "like"],
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The name of the vegetable."
                },
                "like": {
                    "type": "boolean",
                    "description": "Do I like this vegetable?"
                }
            }
        }
    }, "required": [
        "fruits", "vegetables"
    ]
}
const validator = new Validator(addressSchema);
const veggieValidator = new Validator(veggieSchema);


const sspSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://csrc.nist.gov/ns/oscal/1.0_schema.json",
    "$comment": "OSCAL System Security Plan (SSP) Model: JSON Schema",
    "type": "object",
    "definitions": {
        "metadata": {
            "title": "Publication metadata",
            "description": "Provides information about the publication and availability of the containing document.",
            "$id": "#/definitions/metadata",
            "type": "object",
            "properties": {
                "title": {
                    "title": "Document Title",
                    "description": "A name given to the document, which may be used by a tool for display and navigation.",

                    "type": "string"
                },
                "published": {
                    "title": "Publication Timestamp",
                    "description": "The date and time the document was published. The date-time value must be formatted according to RFC 3339 with full time and time zone included.",
                    "type": "string",
                    "format": "date-time",
                    "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                },
                "last_modified": {
                    "title": "Last Modified Timestamp",
                    "description": "The date and time the document was last modified. The date-time value must be formatted according to RFC 3339 with full time and time zone included.",
                    "type": "string",
                    "format": "date-time",
                    "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                },
                "version": {
                    "title": "Document Version",
                    "description": "A string used to distinguish the current version of the document from other previous (and future) versions.",

                    "type": "string"
                },
                "oscal_version": {
                    "title": "OSCAL version",
                    "description": "The OSCAL model version the document was authored against.",

                    "type": "string"
                },
                "revisions": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Revision History Entry",
                        "description": "An entry in a sequential list of revisions to the containing document in reverse chronological order (i.e., most recent previous revision first).",
                        "$id": "#/definitions/revision",
                        "type": "object",
                        "properties": {
                            "title": {
                                "title": "Document Title",
                                "description": "A name given to the document revision, which may be used by a tool for display and navigation.",

                                "type": "string"
                            },
                            "published": {
                                "title": "Publication Timestamp",
                                "description": "The date and time the document was published. The date-time value must be formatted according to RFC 3339 with full time and time zone included.",
                                "type": "string",
                                "format": "date-time",
                                "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                            },
                            "last_modified": {
                                "title": "Last Modified Timestamp",
                                "description": "The date and time the document was last modified. The date-time value must be formatted according to RFC 3339 with full time and time zone included.",
                                "type": "string",
                                "format": "date-time",
                                "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                            },
                            "version": {
                                "title": "Document Version",
                                "description": "A string used to distinguish the current version of the document from other previous (and future) versions.",
                                "type": "string"
                            },
                            "oscal_version": {
                                "title": "OSCAL version",
                                "description": "The OSCAL model version the document was authored against.",

                                "type": "string"
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "links": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/link"
                                }
                            },
                            "remarks": {
                                "$ref": "#/definitions/remarks"
                            }
                        },
                        "additionalProperties": false
                    }
                },
                "document_ids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Document Identifier",
                        "description": "A document identifier qualified by an identifier type.",
                        "$id": "#/definitions/document_id",
                        "type": "object",
                        "properties": {
                            "scheme": {
                                "title": "Document Identification Scheme",
                                "description": "Qualifies the kind of document identifier.",
                                "type": "string",
                                "format": "uri"
                            },
                            "identifier": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "identifier",
                            "scheme"
                        ],
                        "additionalProperties": false
                    }
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "roles": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/role"
                    }
                },
                "locations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/location"
                    }
                },
                "parties": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/party"
                    }
                },
                "responsible_parties": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/responsible_party"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "title",
                "last_modified",
                "version",
                "oscal_version"
            ],
            "additionalProperties": false
        },
        "location": {
            "title": "Location",
            "description": "A location, with associated metadata that can be referenced.",
            "$id": "#/definitions/location",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Location Universally Unique Identifier",
                    "description": "A unique identifier that can be used to reference this defined location elsewhere in an OSCAL document. A UUID should be consistantly used for a given location across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "title": {
                    "title": "Location Title",
                    "description": "A name given to the location, which may be used by a tool for display and navigation.",

                    "type": "string"
                },
                "address": {
                    "title": "Address",
                    "description": "A postal address for the location.",

                    "type": "object",
                    "properties": {
                        "type": {
                            "title": "Address Type",
                            "description": "Indicates the type of address.",
                            "type": "string"
                        },
                        "addr_lines": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "title": "Address line",
                                "description": "A single line of an address.",

                                "type": "string"
                            }
                        },
                        "city": {
                            "title": "City",
                            "description": "City, town or geographical region for the mailing address.",

                            "type": "string"
                        },
                        "state": {
                            "title": "State",
                            "description": "State, province or analogous geographical region for mailing address",

                            "type": "string"
                        },
                        "postal_code": {
                            "title": "Postal Code",
                            "description": "Postal or ZIP code for mailing address",

                            "type": "string"
                        },
                        "country": {
                            "title": "Country Code",
                            "description": "The ISO 3166_1 alpha_2 country code for the mailing address.",
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                },
                "email_addresses": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Email Address",
                        "description": "An email address as defined by RFC 5322 Section 3.4.1.",
                        "type": "string",
                        "format": "email",
                        "pattern": "^.+@.+"
                    }
                },
                "telephone_numbers": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Telephone Number",
                        "description": "Contact number by telephone.",

                        "type": "object",
                        "properties": {
                            "type": {
                                "title": "type flag",
                                "description": "Indicates the type of phone number.",
                                "type": "string"
                            },
                            "number": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "number"
                        ],
                        "additionalProperties": false
                    }
                },
                "urls": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Location URL",
                        "description": "The uniform resource locator (URL) for a web site or Internet presence associated with the location.",
                        "$id": "#/definitions/url",
                        "type": "string",
                        "format": "uri"
                    }
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "uuid",
                "address"
            ],
            "additionalProperties": false
        },
        "location_uuid": {
            "title": "Location Reference",
            "description": "References a location defined in metadata.",
            "$id": "#/definitions/location_uuid",
            "type": "string",
            "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "party": {
            "title": "Party (organization or person)",
            "description": "A responsible entity which is either a person or an organization.",
            "$id": "#/definitions/party",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Party Universally Unique Identifier",
                    "description": "A unique identifier that can be used to reference this defined location elsewhere in an OSCAL document. A UUID should be consistantly used for a given party across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "type": {
                    "title": "Party Type",
                    "description": "A category describing the kind of party the object describes.",
                    "type": "string",
                    "enum": [
                        "person",
                        "organization"
                    ]
                },
                "name": {
                    "title": "Party Name",
                    "description": "The full name of the party. This is typically the legal name associated with the party.",
                    "$id": "#/definitions/name",
                    "type": "string"
                },
                "short_name": {
                    "title": "Party Short Name",
                    "description": "A short common name, abbreviation, or acronym for the party.",
                    "type": "string"
                },
                "external_ids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Party External Identifier",
                        "description": "An identifier for a person or organization using a designated scheme. e.g. an Open Researcher and Contributor ID (ORCID)",
                        "$id": "#/definitions/external_id",
                        "type": "object",
                        "properties": {
                            "scheme": {
                                "title": "External Identifier Schema",
                                "description": "Indicates the type of external identifier.",
                                "type": "string",
                                "format": "uri"
                            },
                            "id": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "id",
                            "scheme"
                        ],
                        "additionalProperties": false
                    }
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "email_addresses": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Email Address",
                        "description": "An email address as defined by RFC 5322 Section 3.4.1.",
                        "type": "string",
                        "format": "email",
                        "pattern": "^.+@.+"
                    }
                },
                "telephone_numbers": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Telephone Number",
                        "description": "Contact number by telephone.",

                        "type": "object",
                        "properties": {
                            "type": {
                                "title": "type flag",
                                "description": "Indicates the type of phone number.",
                                "type": "string"
                            },
                            "number": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "number"
                        ],
                        "additionalProperties": false
                    }
                },
                "addresses": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Address",
                        "description": "A postal address for the location.",

                        "type": "object",
                        "properties": {
                            "type": {
                                "title": "Address Type",
                                "description": "Indicates the type of address.",
                                "type": "string"
                            },
                            "addr_lines": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "title": "Address line",
                                    "description": "A single line of an address.",

                                    "type": "string"
                                }
                            },
                            "city": {
                                "title": "City",
                                "description": "City, town or geographical region for the mailing address.",

                                "type": "string"
                            },
                            "state": {
                                "title": "State",
                                "description": "State, province or analogous geographical region for mailing address",

                                "type": "string"
                            },
                            "postal_code": {
                                "title": "Postal Code",
                                "description": "Postal or ZIP code for mailing address",

                                "type": "string"
                            },
                            "country": {
                                "title": "Country Code",
                                "description": "The ISO 3166_1 alpha_2 country code for the mailing address.",
                                "type": "string"
                            }
                        },
                        "additionalProperties": false
                    }
                },
                "location_uuids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/location_uuid"
                    }
                },
                "member_of_organizations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Organizational Affiliation",
                        "description": "Identifies that the party object is a member of the organization associated with the provided UUID.",
                        "$id": "#/definitions/member_of_organization",
                        "type": "string",
                        "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "uuid",
                "type"
            ],
            "additionalProperties": false
        },
        "party_uuid": {
            "title": "Party Reference",
            "description": "References a party defined in metadata.",
            "$id": "#/definitions/party_uuid",
            "type": "string",
            "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "role": {
            "title": "Role",
            "description": "Defines a function assumed or expected to be assumed by a party in a specific situation.",
            "$id": "#/definitions/role",
            "type": "object",
            "properties": {
                "id": {
                    "title": "Role Identifier",
                    "description": "A unique identifier for a specific role instance. This identifier's uniqueness is document scoped and is intended to be consistent for the same role across minor revisions of the document.",
                    "type": "string"
                },
                "title": {
                    "title": "Role Title",
                    "description": "A name given to the role, which may be used by a tool for display and navigation.",

                    "type": "string"
                },
                "short_name": {
                    "title": "Role Short Name",
                    "description": "A short common name, abbreviation, or acronym for the role.",
                    "type": "string"
                },
                "description": {
                    "title": "Role Description",
                    "description": "A summary of the role's purpose and associated responsibilities.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "id",
                "title"
            ],
            "additionalProperties": false
        },
        "role_id": {
            "title": "Role Identifier Reference",
            "description": "A reference to the roles served by the user.",
            "$id": "#/definitions/role_id",
            "type": "string"
        },
        "back_matter": {
            "title": "Back matter",
            "description": "A collection of resources, which may be included directly or by reference.",
            "$id": "#/definitions/back_matter",
            "type": "object",
            "properties": {
                "resources": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Resource",
                        "description": "A resource associated with content in the containing document. A resource may be directly included in the document base64 encoded or may point to one or more equavalent internet resources.",
                        "$id": "#/definitions/resource",
                        "type": "object",
                        "properties": {
                            "uuid": {
                                "title": "Resource Universally Unique Identifier",
                                "description": "A globally unique identifier that can be used to reference this defined resource elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "title": {
                                "title": "Resource Title",
                                "description": "A name given to the resource, which may be used by a tool for display and navigation.",

                                "type": "string"
                            },
                            "description": {
                                "title": "Resource Description",
                                "description": "A short summary of the resource used to indicate the purpose of the resource.",
                                "type": "string"
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "document_ids": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "title": "Document Identifier",
                                    "description": "A document identifier qualified by an identifier type.",
                                    "type": "object",
                                    "properties": {
                                        "scheme": {
                                            "title": "Document Identification Scheme",
                                            "description": "Qualifies the kind of document identifier.",
                                            "type": "string",
                                            "format": "uri"
                                        },
                                        "identifier": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "identifier",
                                        "scheme"
                                    ],
                                    "additionalProperties": false
                                }
                            },
                            "citation": {
                                "title": "Citation",
                                "description": "A citation consisting of end note text and optional structured bibliographic data.",
                                "$id": "#/definitions/citation",
                                "type": "object",
                                "properties": {
                                    "text": {
                                        "title": "Citation Text",
                                        "description": "A line of citation text.",

                                        "type": "string"
                                    },
                                    "props": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/property"
                                        }
                                    },
                                    "annotations": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/annotation"
                                        }
                                    },
                                    "biblio": {
                                        "title": "Bibliographic Definition",
                                        "description": "A container for structured bibliographic information. The model of this information is undefined by OSCAL.",
                                        "$id": "#/definitions/biblio",
                                        "type": "object",
                                        "additionalProperties": false
                                    }
                                },
                                "required": [
                                    "text"
                                ],
                                "additionalProperties": false
                            },
                            "rlinks": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "title": "Resource link",
                                    "description": "A pointer to an external resource with an optional hash for verification and change detection.",
                                    "$id": "#/definitions/rlink",
                                    "type": "object",
                                    "properties": {
                                        "href": {
                                            "title": "Hypertext Reference",
                                            "description": "A resolvable URI reference to a resource.",
                                            "type": "string",
                                            "format": "uri-reference"
                                        },
                                        "media_type": {
                                            "title": "Media Type",
                                            "description": "Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media Types Registry.",
                                            "type": "string"
                                        },
                                        "hashes": {
                                            "type": "array",
                                            "minItems": 1,
                                            "items": {
                                                "$ref": "#/definitions/hash"
                                            }
                                        }
                                    },
                                    "required": [
                                        "href"
                                    ],
                                    "additionalProperties": false
                                }
                            },
                            "base64": {
                                "title": "Base64",
                                "description": "The Base64 alphabet in RFC 2045 _ aligned with XSD.",
                                "$id": "#/definitions/base64",
                                "type": "object",
                                "properties": {
                                    "filename": {
                                        "title": "File Name",
                                        "description": "Name of the file before it was encoded as Base64 to be embedded in a resource. This is the name that will be assigned to the file when the file is decoded.",
                                        "type": "string",
                                        "format": "uri-reference"
                                    },
                                    "media_type": {
                                        "title": "Media Type",
                                        "description": "Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media Types Registry.",
                                        "type": "string"
                                    },
                                    "value": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "value"
                                ],
                                "additionalProperties": false
                            },
                            "remarks": {
                                "$ref": "#/definitions/remarks"
                            }
                        },
                        "required": [
                            "uuid"
                        ],
                        "additionalProperties": false
                    }
                }
            },
            "additionalProperties": false
        },
        "property": {
            "title": "Property",
            "description": "An attribute, characteristic, or quality of the containing object expressed as a namespace qualified name/value pair. The value of a property is a simple scalar value, which may be expressed as a list of values in some OSCAL formats.",
            "$id": "#/definitions/property",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Property Universally Unique Identifier",
                    "description": "A unique identifier that can be used to reference this property elsewhere in an OSCAL document. A UUID should be consistantly used for a given location across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "name": {
                    "title": "Property Name",
                    "description": "A textual label that uniquely identifies a specific attribute, characteristic, or quality of the property's containing object.",
                    "type": "string"
                },
                "ns": {
                    "title": "Property Namespace",
                    "description": "A namespace qualifying the property's name. This allows different organizations to associate distinct semantics with the same name.",
                    "type": "string",
                    "format": "uri"
                },
                "class": {
                    "title": "Property Class",
                    "description": "A textual label that provides a sub_type or characterization of the property's name. This can be used to further distinguish or discriminate between the semantics of multiple properties of the same object with the same name and ns.",
                    "type": "string"
                },
                "value": {
                    "type": "string"
                }
            },
            "required": [
                "value",
                "name"
            ],
            "additionalProperties": false
        },
        "annotation": {
            "title": "Annotated Property",
            "description": "An attribute, characteristic, or quality of the containing object expressed as a namespace qualified name/value pair with optional explanatory remarks. The value of an annotated property is a simple scalar value.",
            "$id": "#/definitions/annotation",
            "type": "object",
            "properties": {
                "name": {
                    "title": "Annotated Property Name",
                    "description": "A textual label that uniquely identifies a specific attribute, characteristic, or quality of the annotated property's containing object.",
                    "type": "string"
                },
                "uuid": {
                    "title": "Annotated Property Universally Unique Identifier",
                    "description": "A unique identifier that can be used to reference this annotated property elsewhere in an OSCAL document. A UUID should be consistantly used for a given location across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "ns": {
                    "title": "Annotated Property Namespace",
                    "description": "A namespace qualifying the annotated property's name. This allows different organizations to associate distinct semantics with the same name.",
                    "type": "string",
                    "format": "uri"
                },
                "value": {
                    "title": "Annotated Property Value",
                    "description": "Indicates the value of the attribute, characteristic, or quality.",
                    "type": "string"
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "name",
                "value"
            ],
            "additionalProperties": false
        },
        "link": {
            "title": "Link",
            "description": "A reference to a local or remote resource",
            "$id": "#/definitions/link",
            "type": "object",
            "properties": {
                "href": {
                    "title": "Hypertext Reference",
                    "description": "A resolvable URL reference to a resource.",
                    "type": "string",
                    "format": "uri-reference"
                },
                "rel": {
                    "title": "Relation",
                    "description": "Describes the type of relationship provided by the link. This can be an indicator of the link's purpose.",
                    "type": "string"
                },
                "media_type": {
                    "title": "Media Type",
                    "description": "Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media Types Registry.",
                    "type": "string"
                },
                "text": {
                    "title": "Link Text",
                    "description": "A textual label to associate with the link, which may be used for presentation in a tool.",

                    "type": "string"
                }
            },
            "required": [
                "href"
            ],
            "additionalProperties": false
        },
        "responsible_party": {
            "title": "Responsible Party",
            "description": "A reference to a set of organizations or persons that have responsibility for performing a referenced role in the context of the containing object.",
            "$id": "#/definitions/responsible_party",
            "type": "object",
            "properties": {
                "party_uuids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/party_uuid"
                    }
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "party_uuids"
            ],
            "additionalProperties": false
        },
        "responsible_role": {
            "title": "Responsible Role",
            "description": "A reference to one or more roles with responsibility for performing a function relative to the containing object.",
            "$id": "#/definitions/responsible_role",
            "type": "object",
            "properties": {
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "party_uuids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/party_uuid"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "additionalProperties": false
        },
        "hash": {
            "title": "Hash",
            "description": "A representation of a cryptographic digest generated over a resource using a specified hash algorithm.",
            "$id": "#/definitions/hash",
            "type": "object",
            "properties": {
                "algorithm": {
                    "title": "Hash algorithm",
                    "description": "Method by which a hash is derived",
                    "type": "string"
                },
                "value": {
                    "type": "string"
                }
            },
            "required": [
                "value",
                "algorithm"
            ],
            "additionalProperties": false
        },
        "remarks": {
            "title": "Remarks",
            "description": "Additional commentary on the containing object.",
            "$id": "#/definitions/remarks",
            "type": "string"
        },
        "system_component": {
            "title": "Component",
            "description": "A defined component that can be part of an implemented system.",
            "$id": "#/definitions/system_component",
            "type": "object",
            "properties": {
                "type": {
                    "title": "Component Type",
                    "description": "A category describing the purpose of the component.",
                    "type": "string"
                },
                "title": {
                    "title": "Component Title",
                    "description": "A human readable name for the system component.",

                    "type": "string"
                },
                "description": {
                    "title": "Component Description",
                    "description": "A description of the component, including information about its function.",
                    "type": "string"
                },
                "purpose": {
                    "title": "Purpose",
                    "description": "A summary of the technological or business purpose of the component.",
                    "$id": "#/definitions/purpose",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "status": {
                    "title": "Status",
                    "description": "Describes the operational status of the system component.",
                    "type": "object",
                    "properties": {
                        "state": {
                            "title": "State",
                            "description": "The operational status.",
                            "type": "string",
                            "enum": [
                                "under_development",
                                "operational",
                                "disposition",
                                "other"
                            ]
                        },
                        "remarks": {
                            "$ref": "#/definitions/remarks"
                        }
                    },
                    "required": [
                        "state"
                    ],
                    "additionalProperties": false
                },
                "responsible_roles": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/responsible_role"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "protocols": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/protocol"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "type",
                "title",
                "description",
                "status"
            ],
            "additionalProperties": false
        },
        "protocol": {
            "title": "Service Protocol Information",
            "description": "Information about the protocol used to provide a service.",
            "$id": "#/definitions/protocol",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Service Protocol Information Universally Unique Identifier",
                    "description": "A globally unique identifier that can be used to reference this service protocol entry elsewhere in an OSCAL document. A UUID should be consistently used for a given resource across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "name": {
                    "title": "Protocol Name",
                    "description": "The common name of the protocol, which should be the appropriate \"service name\" from the IANA Service Name and Transport Protocol Port Number Registry.",
                    "type": "string"
                },
                "title": {
                    "title": "title field",
                    "description": "A human readable name for the protocol (e.g., Transport Layer Security).",

                    "type": "string"
                },
                "port_ranges": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/port_range"
                    }
                }
            },
            "required": [
                "name"
            ],
            "additionalProperties": false
        },
        "port_range": {
            "title": "Port Range",
            "description": "Where applicable this is the IPv4 port range on which the service operates.",
            "$id": "#/definitions/port_range",
            "type": "object",
            "properties": {
                "start": {
                    "title": "Start",
                    "description": "Indicates the starting port number in a port range",
                    "type": "integer",
                    "multipleOf": 1,
                    "minimum": 0
                },
                "end": {
                    "title": "End",
                    "description": "Indicates the ending port number in a port range",
                    "type": "integer",
                    "multipleOf": 1,
                    "minimum": 0
                },
                "transport": {
                    "title": "Transport",
                    "description": "Indicates the transport type.",
                    "type": "string",
                    "enum": [
                        "TCP",
                        "UDP"
                    ]
                }
            },
            "additionalProperties": false
        },
        "system_user": {
            "title": "System User",
            "description": "A type of user that interacts with the system based on an associated role.",
            "$id": "#/definitions/system_user",
            "type": "object",
            "properties": {
                "title": {
                    "title": "User Title",
                    "description": "A name given to the user, which may be used by a tool for display and navigation.",

                    "type": "string"
                },
                "short_name": {
                    "title": "User Short Name",
                    "description": "A short common name, abbreviation, or acronym for the user.",
                    "type": "string"
                },
                "description": {
                    "title": "User Description",
                    "description": "A summary of the user's purpose within the system.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "role_ids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/role_id"
                    }
                },
                "authorized_privileges": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/authorized_privilege"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "additionalProperties": false
        },
        "authorized_privilege": {
            "title": "Privilege",
            "description": "Identifies a specific system privilege held by the user, along with an associated description and/or rationale for the privilege.",
            "$id": "#/definitions/authorized_privilege",
            "type": "object",
            "properties": {
                "title": {
                    "title": "title field",
                    "description": "A human readable name for the privilege.",

                    "type": "string"
                },
                "description": {
                    "title": "Privilege Description",
                    "description": "A summary of the privilege's purpose within the system.",
                    "type": "string"
                },
                "functions_performed": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/function_performed"
                    }
                }
            },
            "required": [
                "title",
                "functions_performed"
            ],
            "additionalProperties": false
        },
        "function_performed": {
            "title": "Functions Performed",
            "description": "Describes a function performed for a given authorized privilege by this user class.",
            "$id": "#/definitions/function_performed",
            "type": "string"
        },
        "inventory_item": {
            "title": "Inventory Item",
            "description": "A single managed inventory item within the system.",
            "$id": "#/definitions/inventory_item",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Inventory Item Universally Unique Identifier",
                    "description": "A globally unique identifier that can be used to reference this inventory item entry elsewhere in an OSCAL document. A UUID should be consistently used for a given resource across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "description": {
                    "title": "Inventory Item Description",
                    "description": "A summary of the inventory item stating its purpose within the system.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "responsible_parties": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/responsible_party"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "implemented_components": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Implemented Component",
                        "description": "The set of components that are implemented in a given system inventory item.",
                        "$id": "#/definitions/implemented_component",
                        "type": "object",
                        "properties": {
                            "component_uuid": {
                                "title": "Component Universally Unique Identifier Reference",
                                "description": "A reference to a component that is implemented as part of an inventory item.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "links": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/link"
                                }
                            },
                            "responsible_parties": {
                                "type": "object",
                                "minProperties": 1,
                                "additionalProperties": {
                                    "allOf": [
                                        {
                                            "$ref": "#/definitions/responsible_party"
                                        },
                                        {
                                            "not": {
                                                "type": "string"
                                            }
                                        }
                                    ]
                                }
                            },
                            "remarks": {
                                "$ref": "#/definitions/remarks"
                            }
                        },
                        "required": [
                            "component_uuid"
                        ],
                        "additionalProperties": false
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "uuid",
                "description"
            ],
            "additionalProperties": false
        },
        "set_parameter": {
            "title": "Set Parameter Value",
            "description": "Identifies the parameter that will be set by the enclosed value.",
            "$id": "#/definitions/set_parameter",
            "type": "object",
            "properties": {
                "values": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Parameter Value",
                        "description": "A parameter value or set of values.",
                        "$id": "#/definitions/parameter_value",
                        "type": "string"
                    }
                }
            },
            "required": [
                "values"
            ],
            "additionalProperties": false
        },
        "system_id": {
            "title": "System Identification",
            "description": "A unique identifier for the system described by this system security plan.",
            "$id": "#/definitions/system_id",
            "type": "object",
            "properties": {
                "identifier_type": {
                    "title": "Identification System Type",
                    "description": "Identifies the identification system from which the provided identifier was assigned.",
                    "type": "string",
                    "format": "uri"
                },
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": false
        },
        "system_security_plan": {
            "title": "System Security Plan (SSP)",
            "description": "A system security plan, such as those described in NIST SP 800_18",
            "$id": "#/definitions/system_security_plan",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "System Security Plan Universally Unique Identifier",
                    "description": "A globally unique identifier for this catalog instance. This UUID should be changed when this document is revised.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "metadata": {
                    "$ref": "#/definitions/metadata"
                },
                "import_profile": {
                    "$ref": "#/definitions/import_profile"
                },
                "system_characteristics": {
                    "$ref": "#/definitions/system_characteristics"
                },
                "system_implementation": {
                    "$ref": "#/definitions/system_implementation"
                },
                "control_implementation": {
                    "$ref": "#/definitions/control_implementation"
                },
                "back_matter": {
                    "$ref": "#/definitions/back_matter"
                }
            },
            "required": [
                "uuid",
                "metadata",
                "import_profile",
                "system_characteristics",
                "system_implementation",
                "control_implementation"
            ],
            "additionalProperties": false
        },
        "import_profile": {
            "title": "Import Profile",
            "description": "Used to import the OSCAL profile representing the system's control baseline.",
            "$id": "#/definitions/import_profile",
            "type": "object",
            "properties": {
                "href": {
                    "title": "Profile Reference",
                    "description": "A resolvable URL reference to the profile to use as the system's control baseline.",
                    "type": "string",
                    "format": "uri-reference"
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "href"
            ],
            "additionalProperties": false
        },
        "system_characteristics": {
            "title": "System Characteristics",
            "description": "Contains the characteristics of the system, such as its name, purpose, and security impact level.",
            "$id": "#/definitions/system_characteristics",
            "type": "object",
            "properties": {
                "system_ids": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/system_id"
                    }
                },
                "system_name": {
                    "title": "System Name _ Full",
                    "description": "The full name of the system.",
                    "$id": "#/definitions/system_name",
                    "type": "string"
                },
                "system_name_short": {
                    "title": "System Name _ Short",
                    "description": "A short name for the system, such as an acronym, that is suitable for display in a data table or summary list.",
                    "$id": "#/definitions/system_name_short",
                    "type": "string"
                },
                "description": {
                    "title": "System Description",
                    "description": "A summary of the system.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "date_authorized": {
                    "title": "System Authorization Date",
                    "description": "The date the system received its authorization.",
                    "type": "string",
                    "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))(Z|[+-][0-9]{2}:[0-9]{2})?$"
                },
                "security_sensitivity_level": {
                    "title": "Security Sensitivity Level",
                    "description": "The overall information system sensitivity categorization, such as defined by FIPS_199.",
                    "$id": "#/definitions/security_sensitivity_level",
                    "type": "string"
                },
                "system_information": {
                    "$ref": "#/definitions/system_information"
                },
                "security_impact_level": {
                    "$ref": "#/definitions/security_impact_level"
                },
                "status": {
                    "title": "Status",
                    "description": "Describes the operational status of the system.",
                    "type": "object",
                    "properties": {
                        "state": {
                            "title": "State",
                            "description": "The current operating status.",
                            "type": "string",
                            "enum": [
                                "operational",
                                "under_development",
                                "under_major_modification",
                                "disposition",
                                "other"
                            ]
                        },
                        "remarks": {
                            "$ref": "#/definitions/remarks"
                        }
                    },
                    "required": [
                        "state"
                    ],
                    "additionalProperties": false
                },
                "authorization_boundary": {
                    "$ref": "#/definitions/authorization_boundary"
                },
                "network_architecture": {
                    "$ref": "#/definitions/network_architecture"
                },
                "data_flow": {
                    "$ref": "#/definitions/data_flow"
                },
                "responsible_parties": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/responsible_party"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "system_ids",
                "system_name",
                "description",
                "security_sensitivity_level",
                "system_information",
                "security_impact_level",
                "status",
                "authorization_boundary"
            ],
            "additionalProperties": false
        },
        "system_information": {
            "title": "System Information",
            "description": "Contains details about all information types that are stored, processed, or transmitted by the system, such as privacy information, and those defined in NIST SP 800_60.",
            "$id": "#/definitions/system_information",
            "type": "object",
            "properties": {
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "information_types": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Information Type",
                        "description": "Contains details about one information type that is stored, processed, or transmitted by the system, such as privacy information, and those defined in NIST SP 800_60.",
                        "$id": "#/definitions/information_type",
                        "type": "object",
                        "properties": {
                            "uuid": {
                                "title": "Information Type Universally Unique Identifier",
                                "description": "A globally unique identifier that can be used to reference this information type entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "title": {
                                "title": "title field",
                                "description": "A human readable name for the information type. This title should be meaningful within the context of the system.",

                                "type": "string"
                            },
                            "description": {
                                "title": "Information Type Description",
                                "description": "A summary of how this information type is used within the system.",
                                "type": "string"
                            },
                            "categorizations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "title": "Information Type Categorization",
                                    "description": "A set of information type identifiers qualified by the given identification system used, such as NIST SP 800_60.",
                                    "type": "object",
                                    "properties": {
                                        "system": {
                                            "title": "Information Type Identification System",
                                            "description": "Specifies the information type identification system used.",
                                            "type": "string",
                                            "format": "uri"
                                        },
                                        "information_type_ids": {
                                            "type": "array",
                                            "minItems": 1,
                                            "items": {
                                                "title": "Information Type Systemized Identifier",
                                                "description": "An identifier qualified by the given identification system used, such as NIST SP 800_60.",
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "required": [
                                        "system"
                                    ],
                                    "additionalProperties": false
                                }
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "links": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/link"
                                }
                            },
                            "confidentiality_impact": {
                                "title": "Confidentiality Impact Level",
                                "description": "The expected level of impact resulting from the unauthorized disclosure of the described information.",
                                "type": "object",
                                "properties": {
                                    "props": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/property"
                                        }
                                    },
                                    "annotations": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/annotation"
                                        }
                                    },
                                    "links": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/link"
                                        }
                                    },
                                    "base": {
                                        "title": "Base Level (Confidentiality, Integrity, or Availability)",
                                        "description": "The prescribed base (Confidentiality, Integrity, or Availability) security impact level.",
                                        "type": "string"
                                    },
                                    "selected": {
                                        "title": "Selected Level (Confidentiality, Integrity, or Availability)",
                                        "description": "The selected (Confidentiality, Integrity, or Availability) security impact level.",
                                        "type": "string"
                                    },
                                    "adjustment_justification": {
                                        "title": "Adjustment Justification",
                                        "description": "If the selected security level is different from the base security level, this contains the justification for the change.",
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "base"
                                ],
                                "additionalProperties": false
                            },
                            "integrity_impact": {
                                "title": "Integrity Impact Level",
                                "description": "The expected level of impact resulting from the unauthorized modification of the described information.",
                                "type": "object",
                                "properties": {
                                    "props": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/property"
                                        }
                                    },
                                    "annotations": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/annotation"
                                        }
                                    },
                                    "links": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/link"
                                        }
                                    },
                                    "base": {
                                        "title": "Base Level (Confidentiality, Integrity, or Availability)",
                                        "description": "The prescribed base (Confidentiality, Integrity, or Availability) security impact level.",
                                        "type": "string"
                                    },
                                    "selected": {
                                        "title": "Selected Level (Confidentiality, Integrity, or Availability)",
                                        "description": "The selected (Confidentiality, Integrity, or Availability) security impact level.",
                                        "type": "string"
                                    },
                                    "adjustment_justification": {
                                        "title": "Adjustment Justification",
                                        "description": "If the selected security level is different from the base security level, this contains the justification for the change.",
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "base"
                                ],
                                "additionalProperties": false
                            },
                            "availability_impact": {
                                "title": "Availability Impact Level",
                                "description": "The expected level of impact resulting from the disruption of access to or use of the described information or the information system.",
                                "type": "object",
                                "properties": {
                                    "props": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/property"
                                        }
                                    },
                                    "annotations": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/annotation"
                                        }
                                    },
                                    "links": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/link"
                                        }
                                    },
                                    "base": {
                                        "title": "Base Level (Confidentiality, Integrity, or Availability)",
                                        "description": "The prescribed base (Confidentiality, Integrity, or Availability) security impact level.",
                                        "type": "string"
                                    },
                                    "selected": {
                                        "title": "Selected Level (Confidentiality, Integrity, or Availability)",
                                        "description": "The selected (Confidentiality, Integrity, or Availability) security impact level.",
                                        "type": "string"
                                    },
                                    "adjustment_justification": {
                                        "title": "Adjustment Justification",
                                        "description": "If the selected security level is different from the base security level, this contains the justification for the change.",
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "base"
                                ],
                                "additionalProperties": false
                            }
                        },
                        "required": [
                            "title",
                            "description",
                            "confidentiality_impact",
                            "integrity_impact",
                            "availability_impact"
                        ],
                        "additionalProperties": false
                    }
                }
            },
            "required": [
                "information_types"
            ],
            "additionalProperties": false
        },
        "security_impact_level": {
            "title": "Security Impact Level",
            "description": "The overall level of expected impact resulting from unauthorized disclosure, modification, or loss of access to information.",
            "$id": "#/definitions/security_impact_level",
            "type": "object",
            "properties": {
                "security_objective_confidentiality": {
                    "title": "Security Objective: Confidentiality",
                    "description": "A target_level of confidentiality for the system, based on the sensitivity of information within the system.",
                    "$id": "#/definitions/security_objective_confidentiality",
                    "type": "string"
                },
                "security_objective_integrity": {
                    "title": "Security Objective: Integrity",
                    "description": "A target_level of integrity for the system, based on the sensitivity of information within the system.",
                    "$id": "#/definitions/security_objective_integrity",
                    "type": "string"
                },
                "security_objective_availability": {
                    "title": "Security Objective: Availability",
                    "description": "A target_level of availability for the system, based on the sensitivity of information within the system.",
                    "$id": "#/definitions/security_objective_availability",
                    "type": "string"
                }
            },
            "required": [
                "security_objective_confidentiality",
                "security_objective_integrity",
                "security_objective_availability"
            ],
            "additionalProperties": false
        },
        "authorization_boundary": {
            "title": "Authorization Boundary",
            "description": "A description of this system's authorization boundary, optionally supplemented by diagrams that illustrate the authorization boundary.",
            "$id": "#/definitions/authorization_boundary",
            "type": "object",
            "properties": {
                "description": {
                    "title": "Authorization Boundary Description",
                    "description": "A summary of the system's authorization boundary.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "diagrams": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/diagram"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "title": "remarks field",
                    "description": "Commentary about the system's authorization boundary that enhances the diagram.",
                    "type": "string"
                }
            },
            "required": [
                "description"
            ],
            "additionalProperties": false
        },
        "diagram": {
            "title": "Diagram",
            "description": "A graphic that provides a visual representation the system, or some aspect of it.",
            "$id": "#/definitions/diagram",
            "type": "object",
            "properties": {
                "description": {
                    "title": "Diagram Description",
                    "description": "A summary of the diagram.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "caption": {
                    "title": "Caption",
                    "description": "A brief caption to annotate the diagram.",
                    "$id": "#/definitions/caption",
                    "type": "string"
                },
                "remarks": {
                    "title": "remarks field",
                    "description": "Commentary about the diagram that enhances it.",
                    "type": "string"
                }
            },
            "additionalProperties": false
        },
        "network_architecture": {
            "title": "Network Architecture",
            "description": "A description of the system's network architecture, optionally supplemented by diagrams that illustrate the network architecture.",
            "$id": "#/definitions/network_architecture",
            "type": "object",
            "properties": {
                "description": {
                    "title": "Network Architecture Description",
                    "description": "A summary of the system's network architecture.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "diagrams": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/diagram"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "description"
            ],
            "additionalProperties": false
        },
        "data_flow": {
            "title": "Data Flow",
            "description": "A description of the logical flow of information within the system and across its boundaries, optionally supplemented by diagrams that illustrate these flows.",
            "$id": "#/definitions/data_flow",
            "type": "object",
            "properties": {
                "description": {
                    "title": "Data Flow Description",
                    "description": "A summary of the system's data flow.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "diagrams": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/diagram"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "description"
            ],
            "additionalProperties": false
        },
        "system_implementation": {
            "title": "System Implementation",
            "description": "Provides information as to how the system is implemented.",
            "$id": "#/definitions/system_implementation",
            "type": "object",
            "properties": {
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "leveraged_authorizations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Leveraged Authorization",
                        "description": "A description of another authorized system from which this system inherits capabilities that satisfy security requirements. Another term for this concept is a common control provider.",
                        "$id": "#/definitions/leveraged_authorization",
                        "type": "object",
                        "properties": {
                            "uuid": {
                                "title": "Leveraged Authorization Universally Unique Identifier",
                                "description": "A globally unique identifier that can be used to reference this leveraged authorization entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "title": {
                                "title": "title field",
                                "description": "A human readable name for the leveraged authorization in the context of the system.",

                                "type": "string"
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "links": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/link"
                                }
                            },
                            "party_uuid": {
                                "title": "party_uuid field",
                                "description": "A reference to the party that manages the leveraged system.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "date_authorized": {
                                "title": "System Authorization Date",
                                "description": "The date the system received its authorization.",
                                "type": "string",
                                "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))(Z|[+-][0-9]{2}:[0-9]{2})?$"
                            },
                            "remarks": {
                                "$ref": "#/definitions/remarks"
                            }
                        },
                        "required": [
                            "uuid",
                            "title",
                            "party_uuid",
                            "date_authorized"
                        ],
                        "additionalProperties": false
                    }
                },
                "users": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/system_user"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "components": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/system_component"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "inventory_items": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/inventory_item"
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "users",
                "components"
            ],
            "additionalProperties": false
        },
        "control_implementation": {
            "title": "Control Implementation",
            "description": "Describes how the system satisfies a set of controls.",
            "$id": "#/definitions/control_implementation",
            "type": "object",
            "properties": {
                "description": {
                    "title": "Control Implementation Description",
                    "description": "A statement describing important things to know about how this set of control satisfaction documentation is approached.",
                    "type": "string"
                },
                "implemented_requirements": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/implemented_requirement"
                    }
                }
            },
            "required": [
                "description",
                "implemented_requirements"
            ],
            "additionalProperties": false
        },
        "implemented_requirement": {
            "title": "Control_based Requirement",
            "description": "Describes how the system satisfies an individual control.",
            "$id": "#/definitions/implemented_requirement",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Control Requirement Universally Unique Identifier",
                    "description": "A globally unique identifier that can be used to reference this control requirement entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "control_id": {
                    "title": "Control Identifier Reference",
                    "description": "A reference to a control identifier.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "parameter_settings": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/set_parameter"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "responsible_roles": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/responsible_role"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "by_components": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/by_component"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "statements": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/statement"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "uuid",
                "control_id"
            ],
            "additionalProperties": false
        },
        "statement": {
            "title": "Specific Control Statement",
            "description": "Identifies which statements within a control are addressed.",
            "$id": "#/definitions/statement",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "Control Statement Reference Universally Unique Identifier",
                    "description": "A globally unique identifier that can be used to reference this control statement entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "by_components": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/by_component"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "uuid"
            ],
            "additionalProperties": false
        },
        "by_component": {
            "title": "Component Control Implementation",
            "description": "Defines how the referenced component implements a set of controls.",
            "$id": "#/definitions/by_component",
            "type": "object",
            "properties": {
                "uuid": {
                    "title": "By_Component Universally Unique Identifier",
                    "description": "A globally unique identifier that can be used to reference this by_component entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                    "type": "string",
                    "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                },
                "description": {
                    "title": "Control Implementation Description",
                    "description": "An implementation statement that describes how a control or a control statement is implemented within the referenced system component.",
                    "type": "string"
                },
                "props": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/property"
                    }
                },
                "annotations": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/annotation"
                    }
                },
                "links": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/definitions/link"
                    }
                },
                "parameter_settings": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/set_parameter"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "export": {
                    "title": "Export",
                    "description": "Identifies content intended for external consumption, such as with leveraged organizations.",
                    "$id": "#/definitions/export",
                    "type": "object",
                    "properties": {
                        "description": {
                            "title": "Control Implementation Export Description",
                            "description": "An implementation statement that describes the aspects of the control or control statement implementation that can be available to another system leveraging this system.",
                            "type": "string"
                        },
                        "props": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "$ref": "#/definitions/property"
                            }
                        },
                        "annotations": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "$ref": "#/definitions/annotation"
                            }
                        },
                        "links": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "$ref": "#/definitions/link"
                            }
                        },
                        "provided": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "title": "Provided Control Implementation",
                                "description": "Describes a capability which may be inherited by a leveraging system.",
                                "$id": "#/definitions/provided",
                                "type": "object",
                                "properties": {
                                    "uuid": {
                                        "title": "Provided Universally Unique Identifier",
                                        "description": "A globally unique identifier that can be used to reference this provided entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                        "type": "string",
                                        "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                                    },
                                    "description": {
                                        "title": "Provided Control Implementation Description",
                                        "description": "An implementation statement that describes the aspects of the control or control statement implementation that can be provided to another system leveraging this system.",
                                        "type": "string"
                                    },
                                    "props": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/property"
                                        }
                                    },
                                    "annotations": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/annotation"
                                        }
                                    },
                                    "links": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/link"
                                        }
                                    },
                                    "responsible_roles": {
                                        "type": "object",
                                        "minProperties": 1,
                                        "additionalProperties": {
                                            "allOf": [
                                                {
                                                    "$ref": "#/definitions/responsible_role"
                                                },
                                                {
                                                    "not": {
                                                        "type": "string"
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "remarks": {
                                        "$ref": "#/definitions/remarks"
                                    }
                                },
                                "required": [
                                    "uuid",
                                    "description"
                                ],
                                "additionalProperties": false
                            }
                        },
                        "responsibilities": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "title": "Control Implementation Responsibility",
                                "description": "Describes a control implementation responsibiity imposed on a leveraging system.",
                                "$id": "#/definitions/responsibility",
                                "type": "object",
                                "properties": {
                                    "uuid": {
                                        "title": "Responsibility Universally Unique Identifier",
                                        "description": "A globally unique identifier that can be used to reference this responsibility entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                        "type": "string",
                                        "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                                    },
                                    "provided_uuid": {
                                        "title": "Provided UUID",
                                        "description": "Identifies a 'provided' assembly associated with this assembly.",
                                        "type": "string",
                                        "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                                    },
                                    "description": {
                                        "title": "Control Implementation Responsibility Description",
                                        "description": "An implementation statement that describes the aspects of the control or control statement implementation that a leveraging system must implement to satisfy the control provided by a leveraged system.",
                                        "type": "string"
                                    },
                                    "props": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/property"
                                        }
                                    },
                                    "annotations": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/annotation"
                                        }
                                    },
                                    "links": {
                                        "type": "array",
                                        "minItems": 1,
                                        "items": {
                                            "$ref": "#/definitions/link"
                                        }
                                    },
                                    "responsible_roles": {
                                        "type": "object",
                                        "minProperties": 1,
                                        "additionalProperties": {
                                            "allOf": [
                                                {
                                                    "$ref": "#/definitions/responsible_role"
                                                },
                                                {
                                                    "not": {
                                                        "type": "string"
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "remarks": {
                                        "$ref": "#/definitions/remarks"
                                    }
                                },
                                "required": [
                                    "uuid",
                                    "description"
                                ],
                                "additionalProperties": false
                            }
                        },
                        "remarks": {
                            "$ref": "#/definitions/remarks"
                        }
                    },
                    "additionalProperties": false
                },
                "inherited": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Inherited Control Implementation",
                        "description": "Describes a control implementation inherited by a leveraging system.",
                        "$id": "#/definitions/inherited",
                        "type": "object",
                        "properties": {
                            "uuid": {
                                "title": "Inherited Universally Unique Identifier",
                                "description": "A globally unique identifier that can be used to reference this inherited entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "provided_uuid": {
                                "title": "Provided UUID",
                                "description": "Identifies a 'provided' assembly associated with this assembly.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "description": {
                                "title": "Inherited Control Implementation Description",
                                "description": "An implementation statement that describes the aspects of a control or control statement implementation that a leveraging system is inheriting from a leveraged system.",
                                "type": "string"
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "links": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/link"
                                }
                            },
                            "responsible_roles": {
                                "type": "object",
                                "minProperties": 1,
                                "additionalProperties": {
                                    "allOf": [
                                        {
                                            "$ref": "#/definitions/responsible_role"
                                        },
                                        {
                                            "not": {
                                                "type": "string"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        "required": [
                            "uuid",
                            "description"
                        ],
                        "additionalProperties": false
                    }
                },
                "satisfied": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "title": "Satisfied Control Implementation Responsibility",
                        "description": "Describes how this system satisfies a responsibiity imposed by a leveraged system.",
                        "$id": "#/definitions/satisfied",
                        "type": "object",
                        "properties": {
                            "uuid": {
                                "title": "Satisfied Universally Unique Identifier",
                                "description": "A globally unique identifier that can be used to reference this satisfied entry elsewhere in an OSCAL document. A UUID should be consistantly used for a given resource across revisions of the document.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "responsibility_uuid": {
                                "title": "Provided UUID",
                                "description": "Identifies a 'provided' assembly associated with this assembly.",
                                "type": "string",
                                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
                            },
                            "description": {
                                "title": "Satisfied Control Implementation Responsibility Description",
                                "description": "An implementation statement that describes the aspects of a control or control statement implementation that a leveraging system is implementing based on a requirement from a leveraged system.",
                                "type": "string"
                            },
                            "props": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/property"
                                }
                            },
                            "annotations": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/annotation"
                                }
                            },
                            "links": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "$ref": "#/definitions/link"
                                }
                            },
                            "responsible_roles": {
                                "type": "object",
                                "minProperties": 1,
                                "additionalProperties": {
                                    "allOf": [
                                        {
                                            "$ref": "#/definitions/responsible_role"
                                        },
                                        {
                                            "not": {
                                                "type": "string"
                                            }
                                        }
                                    ]
                                }
                            },
                            "remarks": {
                                "$ref": "#/definitions/remarks"
                            }
                        },
                        "required": [
                            "uuid",
                            "description"
                        ],
                        "additionalProperties": false
                    }
                },
                "responsible_roles": {
                    "type": "object",
                    "minProperties": 1,
                    "additionalProperties": {
                        "allOf": [
                            {
                                "$ref": "#/definitions/responsible_role"
                            },
                            {
                                "not": {
                                    "type": "string"
                                }
                            }
                        ]
                    }
                },
                "remarks": {
                    "$ref": "#/definitions/remarks"
                }
            },
            "required": [
                "uuid",
                "description"
            ],
            "additionalProperties": false
        }
    },
    "properties": {
        "system_security_plan": {
            "$ref": "#/definitions/system_security_plan"
        }
    },
    "required": [
        "system_security_plan"
    ],
    "additionalProperties": false,
    "maxProperties": 1
}

const sspValidator = new Validator(sspSchema, "system_component");


export const AddressExample = Template.bind({});
AddressExample.args = {
    title: "Address",
    data: {},
    validator,
    requiredOnly: false,
    onSubmit,
}
export const VeggieExample = Template.bind({});
VeggieExample.args = {
    title: "Veggie",
    data: {},
    validator: veggieValidator,
    onSubmit,
}
export const ComplexExample = Template.bind({});
ComplexExample.args = {
    inlineFields: ["status"],
    data: {},
    validator: sspValidator,
    onSubmit,
}


