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
const oddApi = process.env.VUE_APP_ODD_API_URL;

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
    customizationsLoaded: false,
    profiler: {
      format: "mei",
      version: "4.0.1",
      modules: {},
      level: "modules",
      currentModule: null,
      currentElement: null,
      showDesc: true,
      showInactive: true,
      attClasses: {},
      currentAtts: {},
      activeCustomization: "mei-all",
      customModifications: false,
      maintenanceMode: false,
    }
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
    },
    PROFILER_SET_MODULES(state, modules) {
      let modulesObj = {};

      modules.forEach(module => {
        modulesObj[module.name] = module;
      });
      state.profiler = { ...state.profiler, modules: modulesObj };
    },
    PROFILER_ACTIVATE_MODULE(state, moduleName) {
      if(!state.profiler.customModifications && !state.profiler.maintenanceMode) {
        state.profiler.activeCustomization = 'custom';
        state.profiler.customModifications = true;
      }
      let module = state.profiler.modules[moduleName];
      let newModule = { ...module, active: true}
      let modules = { ...state.profiler.modules };
      modules[moduleName] = newModule;
      state.profiler = { ...state.profiler, modules };
    },
    PROFILER_DEACTIVATE_MODULE(state, moduleName) {
      if(!state.profiler.customModifications && !state.profiler.maintenanceMode) {
        state.profiler.activeCustomization = 'custom';
        state.profiler.customModifications = true;
      }
      let module = state.profiler.modules[moduleName];
      let newModule = { ...module, active: false}
      let modules = { ...state.profiler.modules };
      modules[moduleName] = newModule;
      state.profiler = { ...state.profiler, modules };
    },
    PROFILER_SET_LEVEL(state,level) {
      state.profiler.level = level;
      if (level === "modules") {
        state.profiler.activeModule = null;
      }
    },
    PROFILER_SET_CURRENT_MODULE(state,moduleName) {
      state.profiler.currentModule = moduleName;
      if (moduleName === null) {
        state.profiler.level = "modules";
      } else {
        state.profiler.level = "singleModule";
      }
    },
    PROFILER_SET_CURRENT_ELEMENT(state,name) {
      state.profiler.currentElement = name;
      if (name === null) {
        state.profiler.level = "singleModule";
      } else {
        state.profiler.level = "element";
      }
    },
    PROFILER_SET_ELEMENTS(state, { name, elements }) {
      let module = state.profiler.modules[name];
      let elemObj = {};
      elements.forEach(elem => {
        elem.active = true;
        elemObj[elem.name] = elem;
      });
      state.profiler.modules[name] = { ...module, elements: elemObj };
    },
    PROFILER_SET_ATTCLASSES(state, { name, attClasses }) {
      let module = state.profiler.modules[name];
      let attClassesObj = {};
      attClasses.forEach(attClass => {
        attClassesObj[attClass.name] = attClass;
        let obj = { ...state.profiler.attClasses };
        obj[attClass.name] = attClass;
        obj[attClass.name].active = true;
        state.profiler.attClasses = obj;
      });
      state.profiler.modules[name] = { ...module, attClasses: attClassesObj };

    },
    PROFILER_SET_CURRENT_ATTS(state, json) {
      state.profiler.currentAtts = json;
    },
    PROFILER_TOGGLE_SHOW_DESC(state) {
      state.profiler.showDesc = !state.profiler.showDesc;
    },
    PROFILER_TOGGLE_SHOW_INACTIVE(state) {
      state.profiler.showInactive = !state.profiler.showInactive;
    },
    PROFILER_ACTIVATE_ELEMENT(state, name) {
      try {
        if(!state.profiler.customModifications && !state.profiler.maintenanceMode) {
          state.profiler.activeCustomization = 'custom';
          state.profiler.customModifications = true;
        }
        state.profiler.modules[state.profiler.currentModule].elements[name].active = true;
      } catch(err) {
        console.log('Unable to activate element "' + name +'" in module "' + state.profiler.currentModule + '": ' + err)
      }
    },
    PROFILER_DEACTIVATE_ELEMENT(state, name) {
      try {
        if(!state.profiler.customModifications && !state.profiler.maintenanceMode) {
          state.profiler.activeCustomization = 'custom';
          state.profiler.customModifications = true;
        }
        state.profiler.modules[state.profiler.currentModule].elements[name].active = false;
      } catch(err) {
        console.log('Unable to deactivate element "' + name +'" in module "' + state.profiler.currentModule + '": ' + err)
      }
    },
    PROFILER_ACTIVATE_ATTCLASS(state, name) {
      try {
        if(!state.profiler.customModifications && !state.profiler.maintenanceMode) {
          state.profiler.activeCustomization = 'custom';
          state.profiler.customModifications = true;
        }
        state.profiler.attClasses[name].active = true;
      } catch(err) {
        console.log('Unable to activate att class "' + name +'": ' + err)
      }
    },
    PROFILER_DEACTIVATE_ATTCLASS(state, name) {
      try {
        if(!state.profiler.customModifications && !state.profiler.maintenanceMode) {
          state.profiler.activeCustomization = 'custom';
          state.profiler.customModifications = true;
        }
        state.profiler.attClasses[name].active = false;
      } catch(err) {
        console.log('Unable to deactivate att class "' + name +'": ' + err)
      }
    },
    PROFILER_SET_ACTIVE_CUSTOMIZATION(state, name) {
      if(name !== 'custom') {
        state.profiler.customModifications = false;
      }
      state.profiler.activeCustomization = name;
    },
    PROFILER_SET_MAINTENANCE_MODE(state, bool) {
      state.profiler.maintenanceMode = bool;
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
    },
    profilerFormat: state => {
      return state.profiler.format;
    },
    profilerVersion: state => {
      return state.profiler.version;
    },
    profilerModules: state => {
      return state.profiler.modules;
    },
    profilerModuleNames: state => {
      return Object.keys(state.profiler.modules);
    },
    profilerInactiveModules: state => {
      let im = [];

      for (let moduleName in state.profiler.modules) {
        let module = state.profiler.modules[moduleName];
        if (module.active === false) {
          im.push(moduleName);
        }
      }
      return im;
    },
    profilerInactiveElements: state => {
      let ie = [];

      try {
        let module = state.profiler.modules[state.profiler.currentModule];
        for (let elemName in module.elements) {
          let elem = module.elements[elemName];
          if (elem.active === false) {
            ie.push(elem.name);
          }
        }

      } catch(err) {
        //console.log('err: ' + err)
      }

      return ie;
    },
    profilerInactiveAttClasses: state => {
      let ia = [];

      try {
        for (let className in state.profiler.attClasses) {
          let attClass = state.profiler.attClasses[className];
          if (attClass.active === false) {
            ia.push(attClass.name);
          }
        }

      } catch(err) {
        //console.log('err: ' + err)
      }

      return ia;
    },
    profilerLevel: state => {
      return state.profiler.level;
    },
    profilerCurrentModule: state => {
      if(state.profiler.currentModule === null) {
        return null;
      }
      return state.profiler.modules[state.profiler.currentModule];
    },
    profilerCurrentElement: state => {
      if(state.profiler.currentModule === null) {
        return null;
      }
      if(state.profiler.currentElement === null) {
        return null;
      }
      return state.profiler.modules[state.profiler.currentModule].elements[state.profiler.currentElement];
    },
    profilerModuleElements: state => {
      if (typeof state.profiler.modules[state.profiler.currentModule] !== "undefined" && typeof state.profiler.modules[state.profiler.currentModule].elements !== "undefined") {
        return state.profiler.modules[state.profiler.currentModule].elements;
      } else {
        return {};
      }
    },
    profilerModuleAttClasses: state => {
      if (typeof state.profiler.modules[state.profiler.currentModule] !== "undefined" && typeof state.profiler.modules[state.profiler.currentModule].attClasses !== "undefined") {
        return state.profiler.modules[state.profiler.currentModule].attClasses;
      } else {
        return {};
      }
    },
    profilerShowDesc: state => {
      return state.profiler.showDesc;
    },
    profilerShowInactive: state => {
      return state.profiler.showInactive;
    },
    profilerCurrentAtts: state => {
      return state.profiler.currentAtts;
    },
    profilerActiveCustomization: state => {
      return state.profiler.activeCustomization;
    }
  },
  actions: {
    fetchInputs({ commit }) {
      return new Promise(resolve => {
        //console.log("Fetching available input formats…");
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
    },

    profilerFetchModules({ commit, state }) {
      return new Promise(resolve => {
        let uri = oddApi + state.profiler.format + '/' + state.profiler.version + '/modules.json';
        uri = 'https://odd-api.edirom.de/mei/4.0.1/modules.json';
        fetch(uri)
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then(json => {
            commit("PROFILER_SET_MODULES", json);

            json.forEach(module => {
              new Promise(resolve2 => {
                let uri = oddApi + state.profiler.format + '/' + state.profiler.version + '/' + module.name + '/attClasses.json';
                uri = 'https://odd-api.edirom.de/mei/4.0.1/' + module.name + '/attClasses.json';
                fetch(uri)
                  .then(response => {
                    if (!response.ok) {
                      throw Error(response.statusText);
                    }
                    return response.json();
                  })
                  .then(attClasses => {
                    //console.log(json)
                    try {
                      commit("PROFILER_SET_ATTCLASSES", { name: module.name, attClasses });
                    } catch(e) {
                      console.log('running into troubles with ' + module.name + ': ' + err)
                    }
                    resolve2();
                  })
                  .catch(error => {
                    //console.log(error);
                    resolve2();
                  });
              });

              new Promise(resolve3 => {
                let uri = oddApi + state.profiler.format + '/' + state.profiler.version + '/' + name + '/elements.json';
                uri = 'https://odd-api.edirom.de/mei/4.0.1/' + module.name + '/elements.json';
                fetch(uri)
                  .then(response => {
                    if (!response.ok) {
                      throw Error(response.statusText);
                    }
                    return response.json();
                  })
                  .then(json => {
                    //console.log(json)
                    commit("PROFILER_SET_ELEMENTS", { name: module.name, elements: json });
                    resolve3();
                  })
                  .catch(error => {
                    //console.log(error);
                    resolve3();
                  });
              });
            })

            resolve();
          })
          .catch(error => {
            console.log(error);
            resolve();
          });
      });
    },
    profilerDeActivateModule({ commit }, name) {
      commit("PROFILER_DEACTIVATE_MODULE", name);
    },
    profilerActivateModule({ commit }, name) {
      commit("PROFILER_ACTIVATE_MODULE", name);
    },
    profilerSetLevel({ commit }, level) {
      commit("PROFILER_SET_LEVEL", level);
    },
    profilerToggleShowDesc({ commit }) {
      commit("PROFILER_TOGGLE_SHOW_DESC");
    },
    profilerToggleShowInactive({ commit }) {
      commit("PROFILER_TOGGLE_SHOW_INACTIVE");
    },
    profilerSetCurrentModule({ commit, state }, name) {
      commit("PROFILER_SET_CURRENT_MODULE", name);
      if (name !== null && !(typeof state.profiler.modules[name].elements === "object")) {

        new Promise(resolve => {
          let uri = oddApi + state.profiler.format + '/' + state.profiler.version + '/' + name + '/elements.json';
          uri = 'https://odd-api.edirom.de/mei/4.0.1/' + name + '/elements.json';
          fetch(uri)
            .then(response => {
              if (!response.ok) {
                throw Error(response.statusText);
              }
              return response.json();
            })
            .then(json => {
              //console.log(json)
              commit("PROFILER_SET_ELEMENTS", { name, elements: json });
              resolve();
            })
            .catch(error => {
              console.log(error);
              resolve();
            });
        });
      }
    },
    profilerSetCurrentElement({ commit, state }, name) {
      commit("PROFILER_SET_CURRENT_ELEMENT", name);

      if (name !== null) {
        new Promise(resolve => {
          let uri = 'https://odd-api.edirom.de/mei/4.0.1/' + name + '/atts.json';
          fetch(uri)
            .then(response => {
              if (!response.ok) {
                throw Error(response.statusText);
              }
              return response.json();
            })
            .then(json => {
              //console.log(json)
              commit("PROFILER_SET_CURRENT_ATTS", json);
              resolve();
            })
            .catch(error => {
              console.log(error);
              resolve();
            });
        });
      }
    },
    profilerActivateElement({ commit }, name) {
      commit("PROFILER_ACTIVATE_ELEMENT", name);
    },
    profilerDeActivateElement({ commit }, name) {
      commit("PROFILER_DEACTIVATE_ELEMENT", name);
    },
    profilerActivateAttClass({ commit }, name) {
      commit("PROFILER_ACTIVATE_ATTCLASS", name);
    },
    profilerDeActivateAttClass({ commit }, name) {
      commit("PROFILER_DEACTIVATE_ATTCLASS", name);
    },
    profilerActivateCustomization({ commit }, name) {
      commit("PROFILER_SET_ACTIVE_CUSTOMIZATION", name);
    },
    profilerSetMaintenanceMode({ commit }, bool) {
      commit("PROFILER_SET_MAINTENANCE_MODE", bool);
    }
  }
});
