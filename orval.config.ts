import { defineConfig } from "orval";

function modifyRecursive(obj: object, fn: (obj: object) => boolean) {
  for (const k in obj) {
    if (typeof obj[k] == "object" && obj[k] !== null) {
      const handled = fn(obj);
      if (!handled) {
        modifyRecursive(obj[k], fn);
      }
    }
  }
}

export default defineConfig({
  swapi: {
    input: {
      target: "../../SwWeb2/api.json",
      override: {
        transformer: (api) => {
          modifyRecursive(api, (value) => {
            if ("type" in value && value.type === "object" && "properties" in value && value.properties) {
              value["required"] = Object.keys(value.properties);
              return true;
            }
            if ("parameters" in value && value.parameters && Array.isArray(value.parameters)) {
              value.parameters.forEach((param) => (param.required = true));
              return true;
            }
            return false;
          });
          return api;
        },
      },
    },
    output: {
      target: "src/api",
      client: "vue-query",
      httpClient: "fetch",
      mode: "tags-split",
      mock: false,
    },
  },
});
