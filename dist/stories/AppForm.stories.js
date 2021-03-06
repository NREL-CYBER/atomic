// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import Validator from 'validator';
import AppForm, { findSchemaDefinition } from '../components/forms/AppForm';
export default {
  title: 'atomic/AppForm',
  component: AppForm
};

const Template = args => /*#__PURE__*/React.createElement(AppForm, args);

const addressSchema = {
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A simple Address",
  "title": "Address",
  "$comment": "~",
  "type": "object",
  "properties": {
    "post-office-box": {
      "type": "string",
      "enum": ["80401", "90218", "8888"]
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
  },
  "required": ["fruits", "vegetables"]
};

const validator = () => new Promise(resolve => {
  resolve(new Validator(addressSchema));
});

const veggieValidator = () => new Promise(resolve => {
  resolve(new Validator(veggieSchema));
});

const sapSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://csrc.nist.gov/ns/oscal/1.0-schema.json",
  "$comment": "OSCAL Assessment Plan Model: JSON Schema",
  "type": "object",
  "definitions": {
    "part": {
      "title": "Part",
      "description": "A partition of a control's definition or a child of another part.",
      "$id": "#/definitions/part",
      "type": "object",
      "properties": {
        "id": {
          "title": "Part Identifier",
          "description": "A unique identifier for a specific part instance. This identifier's uniqueness is document scoped and is intended to be consistent for the same part across minor revisions of the document.",
          "type": "string"
        },
        "name": {
          "title": "Part Name",
          "description": "A textual label that uniquely identifies the part's semantic type.",
          "type": "string"
        },
        "ns": {
          "title": "Part Namespace",
          "description": "A namespace qualifying the part's name. This allows different organizations to associate distinct semantics with the same name.",
          "type": "string",
          "format": "uri"
        },
        "class": {
          "title": "Part Class",
          "description": "A textual label that provides a sub-type or characterization of the part's name. This can be used to further distinguish or discriminate between the semantics of multiple parts of the same control with the same name and ns.",
          "type": "string"
        },
        "title": {
          "title": "Part Title",
          "description": "A name given to the part, which may be used by a tool for display and navigation.",
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
        "prose": {
          "title": "Part Text",
          "description": "Permits multiple paragraphs, lists, tables etc.",
          "type": "string"
        },
        "parts": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/part"
          }
        },
        "links": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/link"
          }
        }
      },
      "required": ["name"],
      "additionalProperties": true
    },
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
          "$ref": "#/definitions/oscal-metadata-published"
        },
        "last-modified": {
          "$ref": "#/definitions/oscal-metadata-last-modified"
        },
        "version": {
          "$ref": "#/definitions/oscal-metadata-version"
        },
        "oscal-version": {
          "$ref": "#/definitions/oscal-metadata-oscal-version"
        },
        "revisions": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-revision"
          }
        },
        "document-ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-document-id"
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
        "responsible-parties": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "allOf": [{
              "$ref": "#/definitions/responsible-party"
            }, {
              "not": {
                "type": "string"
              }
            }]
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["title", "last-modified", "version", "oscal-version"],
      "additionalProperties": false
    },
    "oscal-metadata-revision": {
      "title": "Revision History Entry",
      "description": "An entry in a sequential list of revisions to the containing document in reverse chronological order (i.e., most recent previous revision first).",
      "$id": "#/definitions/oscal-metadata-revision",
      "type": "object",
      "properties": {
        "title": {
          "title": "Document Title",
          "description": "A name given to the document revision, which may be used by a tool for display and navigation.",
          "type": "string"
        },
        "published": {
          "$ref": "#/definitions/oscal-metadata-published"
        },
        "last-modified": {
          "$ref": "#/definitions/oscal-metadata-last-modified"
        },
        "version": {
          "$ref": "#/definitions/oscal-metadata-version"
        },
        "oscal-version": {
          "$ref": "#/definitions/oscal-metadata-oscal-version"
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
          "$ref": "#/definitions/oscal-metadata-address"
        },
        "email-addresses": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-email-address"
          }
        },
        "telephone-numbers": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-telephone-number"
          }
        },
        "urls": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Location URL",
            "description": "The uniform resource locator (URL) for a web site or Internet presence associated with the location.",
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
      "required": ["uuid", "address"],
      "additionalProperties": false
    },
    "location-uuid": {
      "title": "Location Reference",
      "description": "References a location defined in metadata.",
      "$id": "#/definitions/location-uuid",
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
          "enum": ["person", "organization"]
        },
        "name": {
          "title": "Party Name",
          "description": "The full name of the party. This is typically the legal name associated with the party.",
          "type": "string"
        },
        "short-name": {
          "title": "Party Short Name",
          "description": "A short common name, abbreviation, or acronym for the party.",
          "type": "string"
        },
        "external-ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Party External Identifier",
            "description": "An identifier for a person or organization using a designated scheme. e.g. an Open Researcher and Contributor ID (ORCID)",
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
            "required": ["id", "scheme"],
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
        "email-addresses": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-email-address"
          }
        },
        "telephone-numbers": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-telephone-number"
          }
        },
        "addresses": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-address"
          }
        },
        "location-uuids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/location-uuid"
          }
        },
        "member-of-organizations": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Organizational Affiliation",
            "description": "Identifies that the party object is a member of the organization associated with the provided UUID.",
            "type": "string",
            "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["uuid", "type"],
      "additionalProperties": false
    },
    "party-uuid": {
      "title": "Party Reference",
      "description": "References a party defined in metadata.",
      "$id": "#/definitions/party-uuid",
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
        "short-name": {
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
      "required": ["id", "title"],
      "additionalProperties": false
    },
    "role-id": {
      "title": "Role Identifier Reference",
      "description": "A reference to the roles served by the user.",
      "$id": "#/definitions/role-id",
      "type": "string"
    },
    "back-matter": {
      "title": "Back matter",
      "description": "A collection of resources, which may be included directly or by reference.",
      "$id": "#/definitions/back-matter",
      "type": "object",
      "properties": {
        "resources": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Resource",
            "description": "A resource associated with content in the containing document. A resource may be directly included in the document base64 encoded or may point to one or more equavalent internet resources.",
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
              "document-ids": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/oscal-metadata-document-id"
                }
              },
              "citation": {
                "title": "Citation",
                "description": "A citation consisting of end note text and optional structured bibliographic data.",
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
                    "type": "object",
                    "additionalProperties": true
                  }
                },
                "required": ["text"],
                "additionalProperties": false
              },
              "rlinks": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "title": "Resource link",
                  "description": "A pointer to an external resource with an optional hash for verification and change detection.",
                  "type": "object",
                  "properties": {
                    "href": {
                      "title": "Hypertext Reference",
                      "description": "A resolvable URI reference to a resource.",
                      "type": "string",
                      "format": "uri-reference"
                    },
                    "media-type": {
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
                  "required": ["href"],
                  "additionalProperties": false
                }
              },
              "base64": {
                "title": "Base64",
                "description": "The Base64 alphabet in RFC 2045 - aligned with XSD.",
                "type": "object",
                "properties": {
                  "filename": {
                    "title": "File Name",
                    "description": "Name of the file before it was encoded as Base64 to be embedded in a resource. This is the name that will be assigned to the file when the file is decoded.",
                    "type": "string",
                    "format": "uri-reference"
                  },
                  "media-type": {
                    "title": "Media Type",
                    "description": "Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media Types Registry.",
                    "type": "string"
                  },
                  "value": {
                    "type": "string"
                  }
                },
                "required": ["value"],
                "additionalProperties": false
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "required": ["uuid"],
            "additionalProperties": true
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
          "description": "A textual label that provides a sub-type or characterization of the property's name. This can be used to further distinguish or discriminate between the semantics of multiple properties of the same object with the same name and ns.",
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      },
      "required": ["value", "name"],
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
      "required": ["name", "value"],
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
        "media-type": {
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
      "required": ["href"],
      "additionalProperties": false
    },
    "responsible-party": {
      "title": "Responsible Party",
      "description": "A reference to a set of organizations or persons that have responsibility for performing a referenced role in the context of the containing object.",
      "$id": "#/definitions/responsible-party",
      "type": "object",
      "properties": {
        "party-uuids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/party-uuid"
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
      "required": ["party-uuids"],
      "additionalProperties": false
    },
    "responsible-role": {
      "title": "Responsible Role",
      "description": "A reference to one or more roles with responsibility for performing a function relative to the containing object.",
      "$id": "#/definitions/responsible-role",
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
        "party-uuids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/party-uuid"
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
      "required": ["value", "algorithm"],
      "additionalProperties": false
    },
    "remarks": {
      "title": "Remarks",
      "description": "Additional commentary on the containing object.",
      "$id": "#/definitions/remarks",
      "type": "string"
    },
    "oscal-metadata-published": {
      "title": "Publication Timestamp",
      "description": "The date and time the document was published. The date-time value must be formatted according to RFC 3339 with full time and time zone included.",
      "$id": "#/definitions/oscal-metadata-published",
      "type": "string",
      "format": "date-time",
      "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
    },
    "oscal-metadata-last-modified": {
      "title": "Last Modified Timestamp",
      "description": "The date and time the document was last modified. The date-time value must be formatted according to RFC 3339 with full time and time zone included.",
      "$id": "#/definitions/oscal-metadata-last-modified",
      "type": "string",
      "format": "date-time",
      "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
    },
    "oscal-metadata-version": {
      "title": "Document Version",
      "description": "A string used to distinguish the current version of the document from other previous (and future) versions.",
      "$id": "#/definitions/oscal-metadata-version",
      "type": "string"
    },
    "oscal-metadata-oscal-version": {
      "title": "OSCAL version",
      "description": "The OSCAL model version the document was authored against.",
      "$id": "#/definitions/oscal-metadata-oscal-version",
      "type": "string"
    },
    "oscal-metadata-email-address": {
      "title": "Email Address",
      "description": "An email address as defined by RFC 5322 Section 3.4.1.",
      "$id": "#/definitions/oscal-metadata-email-address",
      "type": "string",
      "format": "email",
      "pattern": "^.+@.+"
    },
    "oscal-metadata-telephone-number": {
      "title": "Telephone Number",
      "description": "Contact number by telephone.",
      "$id": "#/definitions/oscal-metadata-telephone-number",
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
      "required": ["number"],
      "additionalProperties": false
    },
    "oscal-metadata-address": {
      "title": "Address",
      "description": "A postal address for the location.",
      "$id": "#/definitions/oscal-metadata-address",
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "addr-lines": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/oscal-metadata-addr-line"
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
        "postal-code": {
          "title": "Postal Code",
          "description": "Postal or ZIP code for mailing address",
          "type": "string"
        },
        "country": {
          "title": "Country Code",
          "description": "The ISO 3166-1 alpha-2 country code for the mailing address.",
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "oscal-metadata-addr-line": {
      "title": "Address line",
      "description": "A single line of an address.",
      "$id": "#/definitions/oscal-metadata-addr-line",
      "type": "string"
    },
    "oscal-metadata-document-id": {
      "title": "Document Identifier",
      "description": "A document identifier qualified by an identifier type.",
      "$id": "#/definitions/oscal-metadata-document-id",
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
      "required": ["identifier", "scheme"],
      "additionalProperties": false
    },
    "system-component": {
      "title": "Component",
      "description": "A defined component that can be part of an implemented system.",
      "$id": "#/definitions/system-component",
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
              "enum": ["under-development", "operational", "disposition", "other"]
            },
            "remarks": {
              "$ref": "#/definitions/remarks"
            }
          },
          "required": ["state"],
          "additionalProperties": false
        },
        "responsible-roles": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "allOf": [{
              "$ref": "#/definitions/responsible-role"
            }, {
              "not": {
                "type": "string"
              }
            }]
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
      "required": ["type", "title", "description", "status"],
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
        "port-ranges": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/port-range"
          }
        }
      },
      "required": ["name"],
      "additionalProperties": false
    },
    "port-range": {
      "title": "Port Range",
      "description": "Where applicable this is the IPv4 port range on which the service operates.",
      "$id": "#/definitions/port-range",
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
          "enum": ["TCP", "UDP"]
        }
      },
      "additionalProperties": false
    },
    "system-user": {
      "title": "System User",
      "description": "A type of user that interacts with the system based on an associated role.",
      "$id": "#/definitions/system-user",
      "type": "object",
      "properties": {
        "title": {
          "title": "User Title",
          "description": "A name given to the user, which may be used by a tool for display and navigation.",
          "type": "string"
        },
        "short-name": {
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
        "role-ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/role-id"
          }
        },
        "authorized-privileges": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/authorized-privilege"
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "additionalProperties": false
    },
    "authorized-privilege": {
      "title": "Privilege",
      "description": "Identifies a specific system privilege held by the user, along with an associated description and/or rationale for the privilege.",
      "$id": "#/definitions/authorized-privilege",
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
        "functions-performed": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/function-performed"
          }
        }
      },
      "required": ["title", "functions-performed"],
      "additionalProperties": false
    },
    "function-performed": {
      "title": "Functions Performed",
      "description": "Describes a function performed for a given authorized privilege by this user class.",
      "$id": "#/definitions/function-performed",
      "type": "string"
    },
    "inventory-item": {
      "title": "Inventory Item",
      "description": "A single managed inventory item within the system.",
      "$id": "#/definitions/inventory-item",
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
        "responsible-parties": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "allOf": [{
              "$ref": "#/definitions/responsible-party"
            }, {
              "not": {
                "type": "string"
              }
            }]
          }
        },
        "implemented-components": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Implemented Component",
            "description": "The set of components that are implemented in a given system inventory item.",
            "type": "object",
            "properties": {
              "component-uuid": {
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
              "responsible-parties": {
                "type": "object",
                "minProperties": 1,
                "additionalProperties": {
                  "allOf": [{
                    "$ref": "#/definitions/responsible-party"
                  }, {
                    "not": {
                      "type": "string"
                    }
                  }]
                }
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "required": ["component-uuid"],
            "additionalProperties": false
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["uuid", "description"],
      "additionalProperties": false
    },
    "import-ssp": {
      "title": "Import System Security Plan",
      "description": "Used by the assessment plan and POA&M to import information about the system.",
      "$id": "#/definitions/import-ssp",
      "type": "object",
      "properties": {
        "href": {
          "title": "System Security Plan Reference",
          "description": ">A resolvable URL reference to the system security plan for the system being assessed.",
          "type": "string",
          "format": "uri-reference"
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["href"],
      "additionalProperties": false
    },
    "local-objective": {
      "title": "Assessment-Specific Control Objective",
      "description": "A local definition of a control objective for this assessment. Uses catalog syntax for control objective and assessment actions.",
      "$id": "#/definitions/local-objective",
      "type": "object",
      "properties": {
        "control-id": {
          "title": "Control Identifier Reference",
          "description": "A reference to a control identifier.",
          "type": "string"
        },
        "description": {
          "title": "Objective Description",
          "description": "A human-readable description of this control objective.",
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
        "parts": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/part"
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["control-id", "parts"],
      "additionalProperties": false
    },
    "activity": {
      "title": "Activity",
      "description": "Identifies an assessment or related process that can be performed. In the assessment plan, this is an intended activity which may be associated with an assessment task. In the assessment results, this an activity that was actually performed as part of an assessement.",
      "$id": "#/definitions/activity",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Assessment Activity Universally Unique Identifier",
          "description": "Uniquely identifies this assessment activity. This UUID may be referenced elsewhere in an OSCAL document when refering to this information. A UUID should be consistantly used for a given included activity across revisions of the document.",
          "type": "string",
          "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "title": {
          "title": "Included Activity Title",
          "description": "The title for this included activity.",
          "type": "string"
        },
        "description": {
          "title": "Included Activity Description",
          "description": "A human-readable description of this included activity.",
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
        "actions": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Action",
            "description": "Identifies an individual actions, such as test steps or examination procedures.",
            "type": "object",
            "properties": {
              "uuid": {
                "title": "Action Universally Unique Identifier",
                "description": "Uniquely identifies this defined action. This UUID may be referenced elsewhere in an OSCAL document when refering to this information. A UUID should be consistantly used for a given test step across revisions of the document.",
                "type": "string",
                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
              },
              "title": {
                "title": "Action Title",
                "description": "The title for this action.",
                "type": "string"
              },
              "description": {
                "title": "Action Description",
                "description": "A human-readable description of this action.",
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
              "reviewed-controls": {
                "$ref": "#/definitions/reviewed-controls"
              },
              "responsible-roles": {
                "type": "object",
                "minProperties": 1,
                "additionalProperties": {
                  "allOf": [{
                    "$ref": "#/definitions/responsible-role"
                  }, {
                    "not": {
                      "type": "string"
                    }
                  }]
                }
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "required": ["uuid", "description"],
            "additionalProperties": false
          }
        },
        "related-controls": {
          "$ref": "#/definitions/reviewed-controls"
        },
        "responsible-roles": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "allOf": [{
              "$ref": "#/definitions/responsible-role"
            }, {
              "not": {
                "type": "string"
              }
            }]
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["uuid", "description"],
      "additionalProperties": false
    },
    "task": {
      "title": "Task",
      "description": "Represents a scheduled event or milestone, which may be associated with a series of assessment actions.",
      "$id": "#/definitions/task",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Task Universally Unique Identifier",
          "description": "Uniquely identifies this assessment task.",
          "type": "string",
          "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "type": {
          "title": "Task Type",
          "description": "The type of task.",
          "type": "string"
        },
        "title": {
          "title": "Task Title",
          "description": "The title for this task.",
          "type": "string"
        },
        "description": {
          "title": "Task Description",
          "description": "A human-readable description of this task.",
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
        "timing": {
          "title": "Event Timing",
          "description": "The timing under which the task is intended to occur.",
          "type": "object",
          "properties": {
            "on-date": {
              "title": "On Date Condition",
              "description": "The task is intended to occur on the specified date.",
              "type": "object",
              "properties": {
                "date": {
                  "title": "On Date Condition",
                  "description": "The task must occur on the specified date.",
                  "type": "string",
                  "format": "date-time",
                  "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                }
              },
              "required": ["date"],
              "additionalProperties": false
            },
            "within-date-range": {
              "title": "On Date Range Condition",
              "description": "The task is intended to occur within the specified date range.",
              "type": "object",
              "properties": {
                "start": {
                  "title": "Start Date Condition",
                  "description": "The task must occur on or after the specified date.",
                  "type": "string",
                  "format": "date-time",
                  "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                },
                "end": {
                  "title": "End Date Condition",
                  "description": "The task must occur on or before the specified date.",
                  "type": "string",
                  "format": "date-time",
                  "pattern": "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})$"
                }
              },
              "required": ["start", "end"],
              "additionalProperties": false
            },
            "at-frequency": {
              "title": "Frequency Condition",
              "description": "The task is intended to occur at the specified frequency.",
              "type": "object",
              "properties": {
                "period": {
                  "title": "Period",
                  "description": "The task must occur after the specified period has elapsed.",
                  "type": "integer",
                  "multipleOf": 1,
                  "minimum": 1
                },
                "unit": {
                  "title": "Time Unit",
                  "description": "The unit of time for the period.",
                  "type": "string",
                  "enum": ["seconds", "minutes", "hours", "days", "months", "years"]
                }
              },
              "required": ["period", "unit"],
              "additionalProperties": false
            }
          },
          "additionalProperties": false
        },
        "dependencies": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Task Dependency",
            "description": "Used to indicate that a task is dependant on another task.",
            "type": "object",
            "properties": {
              "task-uuid": {
                "title": "Task Universally Unique Identifier Reference",
                "description": "References a unique task by UUID.",
                "type": "string",
                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "required": ["task-uuid"],
            "additionalProperties": false
          }
        },
        "tasks": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/task"
          }
        },
        "associated-activities": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Associated Activity",
            "description": "Identifies an individual activity to be performed as part of an action.",
            "type": "object",
            "properties": {
              "activity-uuid": {
                "title": "Activity Universally Unique Identifier Reference",
                "description": "References an activity defined in the list of activities.",
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
              "responsible-roles": {
                "type": "object",
                "minProperties": 1,
                "additionalProperties": {
                  "allOf": [{
                    "$ref": "#/definitions/responsible-role"
                  }, {
                    "not": {
                      "type": "string"
                    }
                  }]
                }
              },
              "subjects": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/assessment-subject"
                }
              },
              "subject-placeholder": {
                "$ref": "#/definitions/assessment-subject-placeholder"
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "required": ["activity-uuid"],
            "additionalProperties": false
          }
        },
        "subjects": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/assessment-subject"
          }
        },
        "responsible-roles": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "allOf": [{
              "$ref": "#/definitions/responsible-role"
            }, {
              "not": {
                "type": "string"
              }
            }]
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["uuid", "type", "title"],
      "additionalProperties": false
    },
    "reviewed-controls": {
      "title": "Reviewed Controls and Control Objectives",
      "description": "Identifies the controls being assessed and their control objectives.",
      "$id": "#/definitions/reviewed-controls",
      "type": "object",
      "properties": {
        "description": {
          "title": "Control Objective Description",
          "description": "A human-readable description of control objectives.",
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
        "control-selections": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Assessed Controls",
            "description": "Identifies the controls being assessed. In the assessment plan, these are the planned controls. In the assessment results, these are the actual controls, and reflects any changes from the plan.",
            "type": "object",
            "properties": {
              "description": {
                "title": "Assessed Controls Description",
                "description": "A human-readable description of in-scope controls specified for assessment.",
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
              "include-all": {
                "title": "All",
                "description": "A key word to indicate all.",
                "type": "object",
                "additionalProperties": false
              },
              "include-controls": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/oscal-assessment-common-select-control-by-id"
                }
              },
              "exclude-controls": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/oscal-assessment-common-select-control-by-id"
                }
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "additionalProperties": false
          }
        },
        "control-objective-selections": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Referened Control Objectives",
            "description": "Identifies the control objectives of the assessment. In the assessment plan, these are the planned objectives. In the assessment results, these are the assessed objectives, and reflects any changes from the plan.",
            "type": "object",
            "properties": {
              "description": {
                "title": "Control Ojectives Description",
                "description": "A human-readable description of this collection of control objectives.",
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
              "include-all": {
                "title": "All",
                "description": "A key word to indicate all.",
                "type": "object",
                "additionalProperties": false
              },
              "include-objectives": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/select-objective-by-id"
                }
              },
              "exclude-objectives": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/select-objective-by-id"
                }
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "additionalProperties": false
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["control-selections"],
      "additionalProperties": false
    },
    "oscal-assessment-common-select-control-by-id": {
      "title": "Select Control",
      "description": "Used to select a control for inclusion/exclusion based on one or more control identifiers. A set of statement identifiers can be used to target the inclusion/exclusion to only specific control statements providing more granularity over the specific statements that are within the asessment scope.",
      "$id": "#/definitions/oscal-assessment-common-select-control-by-id",
      "type": "object",
      "properties": {
        "control-id": {
          "title": "Control Identifier Reference",
          "description": "A reference to a control identifier.",
          "type": "string"
        },
        "statement-ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Include Specific Statements",
            "description": "Used to constrain the selection to only specificly identified statements.",
            "type": "string"
          }
        }
      },
      "required": ["control-id"],
      "additionalProperties": false
    },
    "select-objective-by-id": {
      "title": "Select Objective",
      "description": "Used to select a control objective for inclusion/exclusion based on the control objective's identifier.",
      "$id": "#/definitions/select-objective-by-id",
      "type": "object",
      "properties": {
        "": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "assessment-subject-placeholder": {
      "title": "Assessment Subject Placeholder",
      "description": "Used when the assessment subjects will be determined as part of one or more other assessment activities. These assessment subjects will be recorded in the assessment results in the assessment log.",
      "$id": "#/definitions/assessment-subject-placeholder",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Assessment Subject Placeholder Universally Unique Identifier",
          "description": "Uniquely identifies a set of assessment subjects that will be identified by a task or an activity that is part of a task.",
          "type": "string",
          "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "description": {
          "title": "Assessment Subject Placeholder Description",
          "description": "A human-readable description of intent of this assessment subject placeholder.",
          "type": "string"
        },
        "sources": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Assessment Subject Source",
            "description": "Assessment subjects will be identified while conducting the referenced activity-instance.",
            "type": "object",
            "properties": {
              "task-uuid": {
                "title": "Task Universally Unique Identifier",
                "description": "Uniquely identifies an assessment activity to be performed as part of the event. This UUID may be referenced elsewhere in an OSCAL document when refering to this information. A UUID should be consistantly used for this schedule across revisions of the document.",
                "type": "string",
                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
              }
            },
            "required": ["task-uuid"],
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
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["uuid", "sources"],
      "additionalProperties": false
    },
    "assessment-subject": {
      "title": "Subject of Assessment",
      "description": "Identifies system elements being assessed, such as components, inventory items, and locations. In the assessment plan, this identifies a planned assessment subject. In the assessment results this is an actual assessment subject, and reflects any changes from the plan. exactly what will be the focus of this assessment. Any subjects not identified in this way are out-of-scope.",
      "$id": "#/definitions/assessment-subject",
      "type": "object",
      "properties": {
        "type": {
          "title": "Subject Type",
          "description": "Indicates the type of assessment subject, such as a component, inventory, item, location, or party represented by this selection statement.",
          "type": "string"
        },
        "description": {
          "title": "Include Subjects Description",
          "description": "A human-readable description of the collection of subjects being included in this assessment.",
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
        "include-all": {
          "title": "All",
          "description": "A key word to indicate all.",
          "type": "object",
          "additionalProperties": false
        },
        "include-subjects": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/select-subject-by-id"
          }
        },
        "exclude-subjects": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/select-subject-by-id"
          }
        },
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["type"],
      "additionalProperties": false
    },
    "select-subject-by-id": {
      "title": "Select Assessment Subject",
      "description": "Identifies a set of assessment subjects to include/exclude by UUID.",
      "$id": "#/definitions/select-subject-by-id",
      "type": "object",
      "properties": {
        "uuid-ref": {
          "title": "UUID Reference",
          "description": "A pointer to a component, inventory-item, location, party, user, or resource using it's UUID.",
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
        "remarks": {
          "$ref": "#/definitions/remarks"
        }
      },
      "required": ["uuid-ref"],
      "additionalProperties": false
    },
    "assessment-assets": {
      "title": "Assessment Assets",
      "description": "Identifies the assets used to perform this assessment, such as the assessment team, scanning tools, and assumptions.",
      "$id": "#/definitions/assessment-assets",
      "type": "object",
      "properties": {
        "components": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "allOf": [{
              "$ref": "#/definitions/system-component"
            }, {
              "not": {
                "type": "string"
              }
            }]
          }
        },
        "assessment-platforms": {
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Assessment Platform",
            "description": "Used to represent the toolset used to perform aspects of the assessment.",
            "type": "object",
            "properties": {
              "uuid": {
                "title": "Assessment Platform Universally Unique Identifier",
                "description": "Uniquely identifies this assessment Platform.",
                "type": "string",
                "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
              },
              "title": {
                "title": "Assessment Platform Title",
                "description": "The title or name for the assessment platform.",
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
              "uses-components": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "title": "Uses Component",
                  "description": "The set of components that are used by the assessment platform.",
                  "type": "object",
                  "properties": {
                    "component-uuid": {
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
                    "responsible-parties": {
                      "type": "object",
                      "minProperties": 1,
                      "additionalProperties": {
                        "allOf": [{
                          "$ref": "#/definitions/responsible-party"
                        }, {
                          "not": {
                            "type": "string"
                          }
                        }]
                      }
                    },
                    "remarks": {
                      "$ref": "#/definitions/remarks"
                    }
                  },
                  "required": ["component-uuid"],
                  "additionalProperties": false
                }
              },
              "remarks": {
                "$ref": "#/definitions/remarks"
              }
            },
            "required": ["uuid"],
            "additionalProperties": false
          }
        }
      },
      "required": ["assessment-platforms"],
      "additionalProperties": false
    },
    "assessment-part": {
      "title": "Assessment Part",
      "description": "A partition of an assessment plan or results or a child of another part.",
      "$id": "#/definitions/assessment-part",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Part Identifier",
          "description": "A unique identifier for a specific part instance. This identifier's uniqueness is document scoped and is intended to be consistent for the same part across minor revisions of the document.",
          "type": "string",
          "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "name": {
          "title": "Part Name",
          "description": "A textual label that uniquely identifies the part's semantic type.",
          "type": "string"
        },
        "ns": {
          "title": "Part Namespace",
          "description": "A namespace qualifying the part's name. This allows different organizations to associate distinct semantics with the same name.",
          "type": "string",
          "format": "uri"
        },
        "class": {
          "title": "Part Class",
          "description": "A textual label that provides a sub-type or characterization of the part's name. This can be used to further distinguish or discriminate between the semantics of multiple parts of the same control with the same name and ns.",
          "type": "string"
        },
        "title": {
          "title": "Part Title",
          "description": "A name given to the part, which may be used by a tool for display and navigation.",
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
        "prose": {
          "title": "Part Text",
          "description": "Permits multiple paragraphs, lists, tables etc.",
          "type": "string"
        },
        "parts": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/assessment-part"
          }
        },
        "links": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/link"
          }
        }
      },
      "required": ["name"],
      "additionalProperties": true
    },
    "assessment-plan": {
      "title": "Security Assessment Plan (SAP)",
      "description": "An assessment plan, such as those provided by a FedRAMP assessor.",
      "$id": "#/definitions/assessment-plan",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Assessment Plan Universally Unique Identifier",
          "description": "Uniquely identifies this assessment plan. This UUID must be changed each time the content of the plan changes.",
          "type": "string",
          "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
        },
        "metadata": {
          "$ref": "#/definitions/metadata"
        },
        "import-ssp": {
          "$ref": "#/definitions/import-ssp"
        },
        "local-definitions": {
          "title": "Local Definitions",
          "description": "Used to define data objects that are used in the assessment plan, that do not appear in the referenced SSP.",
          "type": "object",
          "properties": {
            "components": {
              "type": "object",
              "minProperties": 1,
              "additionalProperties": {
                "allOf": [{
                  "$ref": "#/definitions/system-component"
                }, {
                  "not": {
                    "type": "string"
                  }
                }]
              }
            },
            "inventory-items": {
              "type": "array",
              "minItems": 1,
              "items": {
                "$ref": "#/definitions/inventory-item"
              }
            },
            "users": {
              "type": "object",
              "minProperties": 1,
              "additionalProperties": {
                "allOf": [{
                  "$ref": "#/definitions/system-user"
                }, {
                  "not": {
                    "type": "string"
                  }
                }]
              }
            },
            "objectives-and-methods": {
              "type": "array",
              "minItems": 1,
              "items": {
                "$ref": "#/definitions/local-objective"
              }
            },
            "activities": {
              "type": "array",
              "minItems": 1,
              "items": {
                "$ref": "#/definitions/activity"
              }
            },
            "remarks": {
              "$ref": "#/definitions/remarks"
            }
          },
          "additionalProperties": false
        },
        "terms-and-conditions": {
          "title": "Assessment Plan Terms and Conditions",
          "description": "Used to define various terms and conditions under which an assessment, described by the plan, can be performed. Each child part defines a different type of term or condition.",
          "type": "object",
          "properties": {
            "parts": {
              "type": "array",
              "minItems": 1,
              "items": {
                "$ref": "#/definitions/assessment-part"
              }
            }
          },
          "additionalProperties": false
        },
        "reviewed-controls": {
          "$ref": "#/definitions/reviewed-controls"
        },
        "assessment-subjects": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/assessment-subject"
          }
        },
        "assessment-assets": {
          "$ref": "#/definitions/assessment-assets"
        },
        "tasks": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/task"
          }
        },
        "back-matter": {
          "$ref": "#/definitions/back-matter"
        }
      },
      "required": ["uuid", "metadata", "import-ssp", "reviewed-controls"],
      "additionalProperties": false
    }
  },
  "properties": {
    "assessment-plan": {
      "$ref": "#/definitions/assessment-plan"
    }
  },
  "required": ["assessment-plan"],
  "additionalProperties": false,
  "maxProperties": 1
};

const sapValidator = () => new Promise(resolve => {
  resolve(new Validator(sapSchema));
});

export const AddressExample = Template.bind({});
AddressExample.args = {
  title: "Address",
  data: {},
  rootSchema: sapSchema,
  requiredOnly: false,
  onSubmit
};
export const VeggieExample = Template.bind({});
VeggieExample.args = {
  title: "Veggie",
  data: {},
  rootSchema: veggieSchema,
  onSubmit
};
export const ComplexExample = Template.bind({});
ComplexExample.args = {
  data: {},
  objectSchema: findSchemaDefinition(sapSchema, "metadata"),
  requiredOnly: true,
  showFields: ["rar"],
  rootSchema: sapSchema,
  onSubmit
};