import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputs: new Map()
  },
  mutations: {
    FETCH_INPUTS (state, inputs) {
      inputs.forEach((input) => {
        state.inputs.set(input.id,input);
        this.dispatch("fetchOutputs", input.id);
      })
    },
    FETCH_OUTPUTS (state, data) {
        state.inputs.get(data.id).outputsLoaded = true;
      state.inputs.get(data.id).outputs = data.outputs;
    }
  },
  getters: {
      inputs: state => state.inputs,
      input: (state) => (id) => {
          return state.inputs.get(id);
      },
      outputs: (state) => (id) => {
          return state.inputs.get(id).outputs;
      }
  },
  actions: {
    fetchInputs({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('Fetching available input formats…')
        fetch('https://meigarage.edirom.de/ege-webservice/Conversions/')
          .then(response => response.text()) //add error handling for failing requests
          .then(data => {
            let parser = new DOMParser();
            let xmlData = parser.parseFromString(data,"text/xml");
            let inputs = [];
            let inputsXML = xmlData.querySelectorAll('input-data-type');
            inputsXML.forEach((format) => {
              let formatInfo = format.id.split(':');
              let id = encodeURI(formatInfo[2].split(',')[0]);
              let mimetype = formatInfo[2].split(',')[1];
              let label = formatInfo[1];
              let targetsDef = format.getAttribute('xlink:href');
              
              let input = {'id': id, 'label': label, 'targetsDef': targetsDef, 'mimetype': mimetype, 'outputsLoaded': false}
              inputs.push(input);
            });
            commit("FETCH_INPUTS", inputs);
          });
        })
      },
      
    fetchOutputs({ commit, state }, inputID) {
      let input = state.inputs.get(inputID);
      if(input.outputsLoaded) return;

      return new Promise((resolve, reject) => {
        console.log('Fetching available output formats from ' + input.targetsDef)
        fetch(input.targetsDef)
          .then(response => response.text()) //add error handling for failing requests
          .then(data => {
            let parser = new DOMParser();
            let xmlData = parser.parseFromString(data,"text/xml");
            let outputs = [];
            let outputsXML = xmlData.querySelectorAll('conversions-path');
            outputsXML.forEach((path) => {
                let conversion = path.querySelector('conversion:last-of-type');
                let href = path.getAttribute('xlink:href');

                //I:
                // Scores:
                // MEI 2.1 XML Document:
                // mei21,text/xml/O:
                // Scores:
                // MEI 3.0 XML Document (.xml):
                // mei30,text/xml(MEI XSL Converter)

              let formatInfo = conversion.id.split(':');
              let id = encodeURI(formatInfo[6].split(',')[0]);
              let full = conversion.id;
              let label = formatInfo[5];
              
              let output = {'id': id, 'label': label, 'input': inputID, 'href': href};
              outputs.push(output);
            });
            commit("FETCH_OUTPUTS", {'id': inputID, 'outputs': outputs});
          });
        })
      }
    }
});
