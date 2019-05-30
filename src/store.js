import Vue from "vue";
import Vuex from "vuex";

import parser from "fast-xml-parser";
import axios from "axios";

import { responseToDownloadable } from "@/util";

const parserOptions = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr",
  textNodeName: "text",
  ignoreAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true
};

const api = process.env.VUE_APP_WEBSERVICE_URL;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputs: {},
    customizations: {},
    // dummy data for now
    customizationVersions: [
      //{
      //  version: "Current Development Version",
      //  date: "some date",
      //  hash: "482220",
      //  link: "commit/482220a54c0dc4da78b1591b99b542649514e618"
      //},
      {
        version: "MEI 4.0.1",
        date: "2019-04-12",
        hash: "5e43035",
        link: "releases/tag/v4.0.1"
      },
      {
        version: "MEI 3.0.0",
        date: "2016-06-15",
        hash: "86dbcaf",
        link: "releases/tag/v3.0.0"
      },
      {
        version: "MEI 2.1.1",
        date: "2013",
        hash: "b9dff53",
        link: "releases/tag/v2.1.1"
      },
      {
        version: "MEI 2.0.0",
        date: "2012",
        hash: "1233176",
        link: "releases/tag/v2.0.0"
      }
    ],
    inputsLoaded: false,
    customizationsLoaded: false
  },
  mutations: {
    FETCH_INPUTS(state, inputs) {
      inputs.forEach(input => {
        const created = {};
        created[input.id] = input;
        state.inputs = Object.assign({}, state.inputs, created);
        this.dispatch("fetchOutputs", input.id).then(() => {});
      });
      state.inputsLoaded = true;
    },
    FETCH_OUTPUTS(state, data) {
      state.inputs[data.id].outputsLoaded = true;
      state.inputs[data.id].outputs = data.outputs;
      state.inputs = Object.assign({}, state.inputs);
    },
    SET_CUSTOMIZATIONS(state, customizations) {
      state.customizations = customizations;
      state.customizationsLoaded = true;
    },
    ADD_CUSTOMIZATION_VERSION(state, version) {
      state.customizationVersions.push(version);
    }
  },
  getters: {
    inputs: state => {
      const keys = Object.keys(state.inputs);
      const values = [];
      for (const key of keys) {
        values.push(state.inputs[key]);
      }
      return values;
    },
    input: state => id => {
      return state.inputs[id];
    },
    outputs: (state, getters) => id => {
      const input = getters.input(id);
      if (!input || !input.outputs) {
        return [];
      }
      return input.outputs;
    },
    customizations: state => {
      return state.customizations;
    },
    customizationVersions: state => {
      return state.customizationVersions;
    }
  },
  actions: {
    fetchInputs({ commit }) {
      return new Promise(resolve => {
        console.log("Fetching available input formats…");
        fetch(api + "Conversions/")
          .then(response => response.text()) //add error handling for failing requests
          .then(data => {
            let inputs = [];
            const parsed = parser.parse(data, parserOptions);
            if (
              parsed["input-data-types"] &&
              parsed["input-data-types"]["input-data-type"]
            ) {
              inputs = parsed["input-data-types"]["input-data-type"].map(
                dataType => {
                  // eslint-disable-next-line no-unused-vars
                  const [_, label, mime] = dataType.attr["@_id"].split(":");
                  const [id, mimetype] = mime.split(",");
                  const targetsDef = dataType.attr["@_xlink:href"];
                  return {
                    id,
                    mimetype,
                    label,
                    targetsDef,
                    outputsLoaded: false
                  };
                }
              );
            }
            commit("FETCH_INPUTS", inputs);
            resolve();
          });
      });
    },

    fetchOutputs({ commit, state }, inputID) {
      let input = state.inputs[inputID];
      if (input.outputsLoaded) return Promise.resolve();

      return new Promise(resolve => {
        fetch(input.targetsDef)
          .then(response => response.text()) //add error handling for failing requests
          .then(data => {
            let outputs = [];
            const parsed = parser.parse(data, parserOptions);
            if (
              parsed["conversions-paths"] &&
              parsed["conversions-paths"]["conversions-path"]
            ) {
              let paths = parsed["conversions-paths"]["conversions-path"];
              if (!Array.isArray(paths)) {
                paths = [paths];
              }
              outputs = paths.map(path => {
                if (!Array.isArray(path.conversion)) {
                  path.conversion = [path.conversion];
                }
                const href = path.attr["@_xlink:href"];
                const steps = path.conversion.map(step => {
                  const [label, format] = step.attr["@_id"]
                    .split(":")
                    .slice(5, 7);
                  const id = encodeURI(format.split(",")[0]);
                  if (!step["property"]) {
                    step["property"] = [];
                  }
                  if (!Array.isArray(step["property"])) {
                    step["property"] = [step["property"]];
                  }
                  const parameters = step["property"].map(param => {
                    const type = param["type"];
                    const label = param["property-name"];
                    const parameter = {
                      id: param.attr["@_id"],
                      type,
                      label
                    };
                    if (type === "array") {
                      parameter.values = param["value"].split(",");
                    }
                    return parameter;
                  });
                  return {
                    id,
                    label,
                    parameters
                  };
                });
                const target = steps[steps.length - 1];
                return {
                  id: target.id,
                  label: target.label,
                  href,
                  steps,
                  input: inputID
                };
              });
            }
            commit("FETCH_OUTPUTS", { id: inputID, outputs: outputs });
            resolve();
          });
      });
    },

    fetchCustomizations({ commit }) {
      return new Promise(resolve => {
        fetch(api + "Customization/")
          .then(response => response.text())
          .then(data => {
            const parsed = parser.parse(data, parserOptions);
            const storedCustomizations = {};
            if (
              parsed["customizations"] &&
              parsed["customizations"]["customization-setting"]
            ) {
              let settings = parsed["customizations"]["customization-setting"];
              if (!Array.isArray(settings)) {
                settings = [settings];
              }
              settings.forEach(setting => {
                const id = setting.attr["@_id"];
                let xmlCustomizations =
                  setting["customizations"]["customization"];
                if (!Array.isArray(xmlCustomizations)) {
                  xmlCustomizations = [xmlCustomizations];
                }
                const customizations = xmlCustomizations.map(customization => {
                  return {
                    id: customization.attr["@_id"],
                    name: customization.attr["@_name"],
                    path: customization.attr["@_path"],
                    type: customization.attr["@_type"]
                  };
                });
                let xmlOutputFormats = setting["outputFormats"]["outputFormat"];
                if (!Array.isArray(xmlOutputFormats)) {
                  xmlOutputFormats = [xmlOutputFormats];
                }
                const outputFormats = xmlOutputFormats.map(outputFormat => {
                  return {
                    name: outputFormat.attr["@_name"]
                  };
                });
                let xmlSources = setting["sources"]["source"];
                if (!Array.isArray(xmlSources)) {
                  xmlSources = [xmlSources];
                }
                const sources = xmlSources.map(source => {
                  return {
                    id: source.attr["@_id"],
                    name: source.attr["@_name"],
                    type: source.attr["@_type"],
                    path: source.attr["@_path"]
                  };
                });
                storedCustomizations[id] = {
                  customizations,
                  outputFormats,
                  sources
                };
              });
            }

            commit("SET_CUSTOMIZATIONS", storedCustomizations);
            resolve();
          });
      });
    },

    triggerCustomization(
      store,
      { settingId, sourceId, customizationId, outputFormat, formData }
    ) {
      const href = `${api}Customization/${settingId}/${sourceId}/${customizationId}/${outputFormat}/`;
      return new Promise((resolve, reject) => {
        axios
          .post(href, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(result => {
            if (result.data.length === 0) {
              reject("Received empty file");
              return;
            }
            // TODO: the result should be stored for a certain amount of time
            resolve(responseToDownloadable(result));
          })
          .catch(reason => {
            reject(reason);
          });
      });
    }
  }
});
