import Ajv, { JSONSchemaType } from "ajv";

import addFormats from "ajv-formats";

import { AppManifest } from "../../types";

const schema: JSONSchemaType<AppManifest> = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    url: { type: "string", format: "uri" },
    icon: { type: "string", nullable: true },
    titleBar: { type: "boolean", default: true, nullable: true },
  },
  required: ["name", "url"],
  additionalProperties: false,
};

const ajv = new Ajv();

addFormats(ajv);

const validate = ajv.compile(schema);

export function validateManifest(obj: object) {
  return validate(obj);
}
