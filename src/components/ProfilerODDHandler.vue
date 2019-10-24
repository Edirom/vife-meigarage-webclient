<template>
  <div>
    <div class="customizations">
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'mei-all')}" v-on:click="activateCustomization('mei-all')">MEI all</div>
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'mei-all_anyStart')}" v-on:click="activateCustomization('mei-all_anyStart')">MEI all anystart</div>
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'mei-CMN')}" v-on:click="activateCustomization('mei-CMN')">MEI CMN</div>
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'mei-Mensural')}" v-on:click="activateCustomization('mei-Mensural')">MEI Mensural</div>
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'mei-Neumes')}" v-on:click="activateCustomization('mei-Neumes')">MEI Neumes</div>
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'bw_module2_works')}" v-on:click="activateCustomization('bw_module2_works')">BW Module 2</div>
      <hr/>
      <div class="customization" v-bind:class="{'active': (activeCustomizationName === 'custom')}" v-on:click="activateCustomization('custom')">Custom Profile</div>
    </div>
    <hr/>
    <div class="buttons">
      <div>
        <a id="downloadODD" href="" disabled download="MEI-Customization.odd" class="btn btn-action btn-link btn-sm"><i class="icon icon-download"></i> Download ODD</a>
      </div>
      <div>
        <button id="downloadRNG" v-on:click="downloadRNG()" class="btn btn-action btn-link btn-sm" disabled title="coming soon"><i class="icon icon-download"></i> Download RelaxNG</button>
      </div>
      <div>
        <button id="uploadODD" v-on:click="uploadODD()" class="btn btn-action btn-link btn-sm"><i class="icon icon-upload"></i> Upload ODD</i></button>
      </div>
    </div>
  </div>
</template>

<script>

let convert = require('xml-js')
let customizations = {};
let unwatch; //used to kill a listener later on
let schemaSpec;

export default {
  name: "ProfilerODDHandler",
  computed: {
    activeCustomizationName: function() {
      return this.$store.getters.profilerActiveCustomization;
    },
    moduleNames: function() {
      return this.$store.getters.profilerModuleNames;
    },
    inactiveModules: function() {
      return this.$store.getters.profilerInactiveModules;
    },
    inactiveClasses: function() {
      return this.$store.getters.profilerInactiveAttClasses;
    }
  },
  methods: {
    getCustomization: function(name) {
      return new Promise(resolve => {
        fetch('./customizations/' + name + '.xml')
          .then(response => {
            if(!response.ok) {
              throw Error(response.statusText);
            }
            return response.text();
          })
          .then(xml => {
            let json = convert.xml2js(xml, {compact: false});
            customizations[name] = json;
            resolve();
          })
          .catch(error => {
            console.log('unable to fetch ' + name + ': ' + error);
            resolve();
          })
      })
    },
    activateCustomization: function(name) {
      //this triggers to switch the customization, it's the button on the left
      this.$store.dispatch('profilerActivateCustomization',name)
    },
    setSchemaSpec: function() {
      let oddJson = customizations[this.activeCustomizationName]
      //console.log(oddJson);
      let tei = oddJson.elements.filter(elem => {return elem.type === 'element' && elem.name === 'TEI'})[0];
      let text = tei.elements.filter(elem => {return elem.type === 'element' && elem.name === 'text'})[0];
      let body = text.elements.filter(elem => {return elem.type === 'element' && elem.name === 'body'})[0];
      schemaSpec = body.elements.filter(elem => {return elem.type === 'element' && elem.name === 'schemaSpec'})[0];
    },
    parseExistingCustomization: function() {
      //console.log('I need to parse the object at ' + this.activeCustomizationName)

      this.$store.dispatch('profilerSetMaintenanceMode',true)

      this.setSchemaSpec();


      // adjust modules
      let moduleRefs = schemaSpec.elements.filter(elem => {return elem.type === 'element' && elem.name === 'moduleRef'});

      let allModules = this.moduleNames;
      let previouslyInactiveModules = this.inactiveModules;
      let activeModules = [];

      let excludedElements = {};

      for (let moduleRef of moduleRefs) {
        let name = moduleRef.attributes.key;
        let except = moduleRef.attributes.except;
        let exceptArr = (typeof except !== 'undefined') ? except.split(' ') : [];

        if(exceptArr.length > 0) {
          this.$store.dispatch('profilerSetCurrentModule',name);
          for (let elem of exceptArr) {
            this.$store.dispatch('profilerDeActivateElement',elem);
          }
          excludedElements[name] = exceptArr;
        }

        let includes = moduleRef.attributes.include;

        if(typeof except === 'undefined' && typeof includes !== 'undefined') {
          let includesArr = includes.split(' ');
          this.$store.dispatch('profilerSetCurrentModule',name);
          let allElements = Object.keys(this.$store.getters.profilerModuleElements);
          let excludes = allElements.filter(elem => {return includesArr.indexOf(elem) === -1});
          // console.log('module ' + name + ' excludes ' + excludes.length + ' elements: ' + excludes.join(', '))
          if(excludes.length > 0) {
            for (let elem of excludes) {
              this.$store.dispatch('profilerDeActivateElement',elem);
            }
            excludedElements[name] = excludes;
          }
        }

        // this.$store.getters.profilerModuleElements => {object}

        activeModules.push(name);
        if(previouslyInactiveModules.indexOf(name) !== -1) {
          // console.log('I should turn on ' + moduleName)
          this.$store.dispatch('profilerActivateModule',name)
        }
      }

      //console.log('excludedElements')
      //console.log(excludedElements)

      for(let moduleName of allModules) {
        if(activeModules.indexOf(moduleName) === -1) {
          // console.log('I should turn off ' + moduleName)
          this.$store.dispatch('profilerDeActivateModule',moduleName)
        }
      }

      // adjust attribute classes
      let removedClassSpecs = schemaSpec.elements.filter(elem => {return elem.type === 'element' && elem.name === 'classSpec' && elem.attributes.type === 'atts' && elem.attributes.mode === 'delete'});

      let removedClassesNames = [];

      for (let classSpec of removedClassSpecs) {
        let name = classSpec.attributes.ident;
        removedClassesNames.push(name);

        if(this.inactiveClasses.indexOf(name) === -1) {
          //console.log('deactivating ' + name)
          this.$store.dispatch('profilerDeActivateAttClass', name);
        }
      }

      for (let name of this.inactiveClasses) {
        if(removedClassesNames.indexOf(name) === -1) {
          this.$store.dispatch('profilerActivateAttClass', name);
        }
      }
      this.$store.dispatch('profilerSetLevel','modules')
      this.$store.dispatch('profilerSetMaintenanceMode',false)
      //console.log(schemaSpec)
    },
    addModule: function(ident) {
      let moduleRef = { type: 'element', name: 'moduleRef', attributes: { key: ident }};

      let excepts = [];
      let elements = this.$store.state.profiler.modules[ident].elements;
      for(let elemName in elements) {
        let elem = elements[elemName];
        if(elem.active === false) {
          excepts.push(elemName);
        }
      }
      if(excepts.length > 0) {
        moduleRef.attributes['except'] = excepts.join(' ');
      }
      schemaSpec.elements.push(moduleRef);
    },
    removeModule: function(ident) {
      let index = -1;
      schemaSpec.elements.forEach((moduleRef, i) => {
        if(moduleRef.type === 'element' && moduleRef.name === 'moduleRef' && moduleRef.attributes.key === ident) {
          index = i;
        }
      });
      if(index !== -1) {
        schemaSpec.elements.splice(index,1);
      }
    },
    addElement: function(ident) {
      let moduleIdent = this.$store.state.profiler.currentModule;
      let moduleRef;
      //this works under the assumption that elements can only be added to the current module
      schemaSpec.elements.forEach((m, i) => {
        if(m.type === 'element' && m.name === 'moduleRef' && m.attributes.key === moduleIdent) {
          moduleRef = m;
        }
      });
      // do the except style
      if (typeof moduleRef.attributes.except !== 'undefined') {
        let arr = moduleRef.attributes.except.split(' ');
        let i = arr.indexOf(ident);
        arr.splice(i,1)
        moduleRef.attributes.except = arr.join(' ');
      // do the include style
      } else if (typeof moduleRef.attributes.include !== 'undefined') {
        moduleRef.attributes.include += ' ' + ident;
      // how could I add something if nothing has been missing?
      } else {
        console.log('Error: this should not have happend, while trying to add ' + ident + ' to moduleIdent');
        console.log(moduleRef);
      }
    },
    removeElement: function(ident) {
      let moduleIdent = this.$store.state.profiler.currentModule;
      let moduleRef;
      //this works under the assumption that elements can only be removed from the current module
      schemaSpec.elements.forEach((m, i) => {
        if(m.type === 'element' && m.name === 'moduleRef' && m.attributes.key === moduleIdent) {
          moduleRef = m;
        }
      });
      // do the except style
      if (typeof moduleRef.attributes.except !== 'undefined') {
        moduleRef.attributes.except += ' ' + ident;
      // do the include style
      } else if (typeof moduleRef.attributes.include !== 'undefined') {
        let arr = moduleRef.attributes.include.split(' ');
        let i = arr.indexOf(ident);
        arr.splice(i,1)
        moduleRef.attributes.include = arr.join(' ');
      // add a new except
      } else {
        moduleRef.attributes.except = ident;
      }
    },
    addAttClass: function(ident) {
      let index = -1;
      try {
        schemaSpec.elements.forEach((elem,i) => {
          let isClassSpec = (elem.type === 'element' && elem.name === 'classSpec' && elem.attributes.type === 'atts');
          let isRightClass = elem.attributes.ident === ident;
          let isDelete = elem.attributes.mode === 'delete';

          if(isClassSpec && isRightClass && isDelete) {
            index = i;
          }
        })
        if(index !== -1) {
          schemaSpec.elements.splice(index,1);
        }
      } catch(err) {
        console.log('unable to add class ' + ident + ', as it wasn\'t deleted in the first place… (' + err + ')')
      }
    },
    removeAttClass: function(ident) {

      let classSpec = { type: 'element', name: 'classSpec', attributes: {
        type: 'atts', ident, mode: 'delete' }};

      schemaSpec.elements.push(classSpec);

    },
    prepareODDdownload: function() {

      this.trackChangeInOdd();

      let button = document.getElementById('downloadODD');
      button.removeAttribute('disabled');

      try {
        let customization = customizations[this.activeCustomizationName];
        let xml = convert.js2xml(customization, {spaces: 2})
        let fullString = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml);
        button.setAttribute('href',fullString);
        let date = new Date(Date.now()).toISOString();
        button.setAttribute("download", "MEI-customization-" + date.substr(0,19) + ".odd");
      } catch(err) {
        console.log('not ready yet: ' + err)
      }
      /*
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      let dl = document.getElementById('download');
      dl.setAttribute("href", dataStr);
      dl.setAttribute("download", "MEI-profile-" + new Date(Date.now()).toISOString() + ".json");

       */

    },
    downloadRNG: function() {
      console.log('unable to do that yet')
    },
    uploadODD: function() {
      console.log('should be uploading ODD now')
    },
    trackChangeInOdd: function() {
      let customization = customizations[this.activeCustomizationName];

      let tei = customization.elements.filter(elem => {return elem.type === 'element' && elem.name === 'TEI'})[0];
      let teiHeader = tei.elements.filter(elem => {return elem.type === 'element' && elem.name === 'teiHeader'})[0];
      let revisionDesc = teiHeader.elements.filter(elem => {return elem.type === 'element' && elem.name === 'revisionDesc'})[0];

      if(typeof revisionDesc === 'undefined') {
        let newRevisionDesc = { type: 'element', name: 'revisionDesc', elements: []};
        let change = this.generateTEIChange(1);
        newRevisionDesc.elements.push(change);
        teiHeader.elements.push(revisionDesc);
      } else {
        let date = new Date(Date.now()).toISOString();
        let dateString = date.substr(0,10);
        let changes = revisionDesc.elements.filter(elem => {return elem.type === 'element' && elem.name === 'change'});
        if(changes.length === 0) {
          let newChange = this.generateTEIChange(1);
          revisionDesc.elements.push(newChange);
        } else {
          let todaysChange = changes.filter(change => {
            let rightType = change.attributes.type === 'meigarage';
            let rightDate = change.attributes.when === dateString;
            return rightType && rightDate;
          })
          if(todaysChange.length === 0) {
            let highestN = -1;
            changes.forEach(change => {
              if(parseInt(change.attributes.n,10) > highestN) {
                highestN = parseInt(change.attributes.n,10);
              }
            })
            let newChange = this.generateTEIChange(highestN + 1);
            revisionDesc.elements.push(newChange);
          }
        }
      }
    },
    generateTEIChange: function(n) {
      let date = new Date(Date.now()).toISOString()
      let verb = (n == 1) ? 'generated' : 'modified';
      let change = { type: 'element', name: 'change', attributes: {
        n, when: date.substr(0,10), type: 'meigarage'}, elements:[
          { type: 'element', name: 'desc', elements: [
            { type: 'text', text: 'ODD ' + verb + ' online with https://meigarage.edirom.de'}
          ]}
        ]};
      return change;
    },
  },
  created () {
    //console.log('just created the ProfilerODDHandler')
    let c1 = this.getCustomization('mei-all');
    let c2 = this.getCustomization('mei-all_anyStart');
    let c3 = this.getCustomization('mei-CMN');
    let c4 = this.getCustomization('mei-Mensural');
    let c5 = this.getCustomization('mei-Neumes');
    let c6 = this.getCustomization('bw_module2_works');
    Promise.all([c1,c2,c3,c4,c5,c6]).then(results => {

    })
  },
  mounted () {
    unwatch = this.$store.watch(
      (state, getters) => ({ maintenanceMode: state.profiler.maintenanceMode, customization: getters.profilerActiveCustomization, inactiveModules: getters.profilerInactiveModules, inactiveAttClasses: getters.profilerInactiveAttClasses, inactiveElements: getters.profilerInactiveElements }),
      (newState, oldState) => {

        //make sure to switch to custom customization if needed
        if (newState.customization !== oldState.customization && newState.customization === 'custom') {
            console.log('copying object');
            let newCus = JSON.parse(JSON.stringify(customizations[oldState.customization]));
            customizations['custom'] = newCus;
            this.setSchemaSpec();
        }

        if (newState.customization !== oldState.customization && newState.customization !== 'custom') {
          this.parseExistingCustomization();
        }

        if(newState.maintenanceMode === true || newState.customization !== 'custom') {
          return false;
        }

        // modules modified
        if (newState.inactiveModules.length !== oldState.inactiveModules.length) {
          // module removed
          if(newState.inactiveModules.length > oldState.inactiveModules.length) {
            let ident = newState.inactiveModules.filter(mod => {return oldState.inactiveModules.indexOf(mod) === -1})[0];
            this.removeModule(ident)
          // module added
          } else {
            let ident = oldState.inactiveModules.filter(mod => {return newState.inactiveModules.indexOf(mod) === -1})[0];
            this.addModule(ident)
          }
        }

        // elements modified
        if (newState.inactiveElements.length !== oldState.inactiveElements.length) {
          // element removed
          if(newState.inactiveElements.length > oldState.inactiveElements.length) {
            let ident = newState.inactiveElements.filter(mod => {return oldState.inactiveElements.indexOf(mod) === -1})[0];
            this.removeElement(ident)
          // element added
          } else {
            let ident = oldState.inactiveElements.filter(mod => {return newState.inactiveElements.indexOf(mod) === -1})[0];
            this.addElement(ident)
          }
        }

        // attribute classes modified
        if (newState.inactiveAttClasses.length !== oldState.inactiveAttClasses.length) {
          // att class removed
          if(newState.inactiveAttClasses.length > oldState.inactiveAttClasses.length) {
            let ident = newState.inactiveAttClasses.filter(mod => {return oldState.inactiveAttClasses.indexOf(mod) === -1})[0];
            this.removeAttClass(ident)
          // att class added
          } else {
            let ident = oldState.inactiveAttClasses.filter(mod => {return newState.inactiveAttClasses.indexOf(mod) === -1})[0];
            this.addAttClass(ident)
          }
        }

        // adjust download
        try {
          this.prepareODDdownload();
        } catch(err) {
          console.log('apparently no download yet');
        }

      }
    )
  },
  beforeDestroy () {
    try {
      unwatch()
    } catch (err) {
      console.log('[ERROR] Unable to remove watcher: ' + err)
    }
  },
};
</script>

<style scoped lang="scss">
  .customization.active {
    font-weight: 700;
  }
</style>
