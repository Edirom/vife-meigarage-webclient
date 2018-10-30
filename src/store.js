import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputs: new Map()
  },
  mutations: {
    FETCH_INPUTS (state,inputs) {
      inputs.forEach((input,i) => {
        state.inputs.set(input.id,input);
      })
    },
    FETCH_OUTPUTS (state,inputID,outputs) {
      state.inputs.get(inputID).outputs = outputs;
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
            inputsXML.forEach((format,i) => {
              let formatInfo = format.id.split(':');
              let id = encodeURI(formatInfo[2].split(',')[0]);
              let mimetype = formatInfo[2].split(',')[1];
              let label = formatInfo[1];
              let targetsDef = format.getAttribute('xlink:href');
              
              let input = {id,label,targetsDef,mimetype}
              inputs.push(input);
            });
            commit("FETCH_INPUTS", inputs);
          });
        })
      },
      
    fetchOutputs({ commit, state }, inputID) {
      let input = state.inputs.get(inputID);
      console.log('input:')
      console.log(inputID)
      console.log(state.inputs);
      return new Promise((resolve, reject) => {
        console.log('Fetching available input formats from ' + input.targetsDef)
        fetch(input.targetsDef)
          .then(response => response.text()) //add error handling for failing requests
          .then(data => {
            let parser = new DOMParser();
            let xmlData = parser.parseFromString(data,"text/xml");
            let outputs = [];
            let outputsXML = xmlData.querySelectorAll('conversion');
            outputsXML.forEach((format,i) => {
              let formatInfo = format.id.split(':');
              let id = encodeURI(formatInfo[6].split(',')[0]);
              let full = format.id;
              let label = formatInfo[5];
              
              let output = {id,label,full}
              outputs.push(output);
            });
            console.log('\n\noutputs:')
            console.log(outputs)
            commit("FETCH_OUTPUTS", inputID, outputs);
          });
        })
      }
    }
});
