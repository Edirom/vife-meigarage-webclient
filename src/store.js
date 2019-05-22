import Vue from "vue";
import Vuex from "vuex";

import parser from "fast-xml-parser";

const parserOptions = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr",
  textNodeName: "text",
  ignoreAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputs: {}
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
    }
  },
  actions: {
    fetchInputs({ commit }) {
      return new Promise(resolve => {
        console.log("Fetching available input formats…");
        fetch(process.env.VUE_APP_WEBSERVICE_URL + "Conversions/")
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
              outputs = parsed["conversions-paths"]["conversions-path"].map(
                path => {
                  if (!Array.isArray(path.conversion)) {
                    path.conversion = [path.conversion];
                  }
                  const href = path.attr["@_xlink:href"];
                  const steps = path.conversion.map(step => {
                    const [label, format] = step.attr["@_id"]
                      .split(":")
                      .slice(5, 7);
                    const id = encodeURI(format.split(",")[0]);
                    const stepHref = step.attr["@_xlink:href"];
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
                      href: stepHref,
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
                }
              );
            }
            commit("FETCH_OUTPUTS", { id: inputID, outputs: outputs });
            resolve();
          });
      });
    }
  }
});
