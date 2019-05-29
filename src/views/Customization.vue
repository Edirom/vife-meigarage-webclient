<template>
  <div>
    <div v-if="isLoading">
      <loading></loading>
    </div>
    <div v-else>
      <not-found v-if="notFound">
        <router-link to="/customizations"></router-link>
      </not-found>
      <div v-else class="columns">
        <div class="column col-12">
          <Breadcrumb/>
        </div>
        <div class="column col-12">
          <h1>MEI Customization Service</h1>
          <p>Select an MEI version and a customization to generate a custom MEI Schema</p>
          <form id="customizationForm">
            <div class="columns">
              <div class="column col-4 col-lg-6 col-md-12">
                <div class="optionsBox">
                  <h2>MEI Source</h2>
                  <div id="profileRadios" class="form-group">
                    <div v-for="(source, index) in sources" :source="source" :key="source.id">
                      <hr v-if="isLocal(source)"/>
                      <label class="form-radio">
                        <input type="radio" name="source" :value="index" v-model="selectedSource" :disabled="processing"/>
                        <i class="form-icon"></i> {{ source.name }}
                      </label>
                      <input type="file" name="source_canonical_file" v-if="isLocal(source) && selectedSource === index"/>
                    </div>
                  </div>
                </div>
              </div>

              <div class="column col-4 col-lg-6 col-md-12">
                <div class="optionsBox">
                  <h2>Customization</h2>
                  <div id="customizationRadios" class="form-group">
                    <div v-for="(customization, index) in customizations"
                      :customization="customization" :key="customization.id">
                      <hr v-if="isLocal(customization)"/>
                      <label class="form-radio">
                        <input type="radio" name="customization" :value="index" v-model="selectedCustomization" :disabled="processing"/>
                        <i class="form-icon"></i> {{ customization.name }}
                      </label>
                      <input type="file" name="local_customization_file" v-if="isLocal(customization) && selectedCustomization === index"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column col-4 col-lg-12 col-md-12">
                <div class="optionsBox">
                  <h2>Output</h2>
                  <div id="outputRadios" class="form-group">
                    <label class="form-radio" v-for="(output, index) in outputs"
                           :output="output" :key="output.id">
                      <input type="radio" name="output" :value="index" v-model="selectedOutput" :disabled="processing"/>
                      <i class="form-icon"></i> {{ output.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div id="results">
            <div class="columns">
              <div class="column col-4">
                <div id="btnBox" class="columnBox">
                  <button class="btn btn-primary btn-lg" @click="buttonClick" :disabled="processing">{{buttonText}}</button>

                  <div id="processing" v-if="processing">
                    <progress class="progress" max="100"></progress>
                  </div>
                </div>
              </div>
              <div class="column col-8">
                <div id="logBox" class="columnBox">
                  <h2>Logs</h2>
                  <div id="logs">
                    <div v-for="(entry, index) in log" :key="index" :entry="entry">
                      {{ entry }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="versionInfo">
            <h1>Version Information</h1>
            <table class="table">
              <thead>
                <tr>
                  <th>version</th>
                  <th>date</th>
                  <th>git hash</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="version of customizationVersions" :key="version.hash" :version="version">
                  <td>{{ version.version }}</td>
                  <td>{{ version.date }}</td>
                  <td><a :href="'https://github.com/music-encoding/music-encoding/' + version.link" target="_blank">{{ version.hash }}</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="rest">
            <h1>REST</h1>
            <p>This customization service is available through a RESTful API. Please use the
              following POST:</p>
              <div class="restURL">https://meigarage.edirom.de/rest/validation/mei/4.0.1/mei-all/tralala</div>
            <p><a onclick="alert('Link zur Swagger-Dokumentation')">API Documentation</a></p>
          </div>

          <div class="internalComment">
            <h1>Interne Hinweise zur Umsetzung</h1>
            <p>
              Alle Kombinationen oberhalb der Striche bei Source und Customization können m.E.
              statisch hinterlegt werden – da ändert sich ja nichts. Man könnte immer noch
              die aktuelle dev-Version dazunehmen (das gilt dann aber genauso für Validation…).
            </p>
            <p>
              Die Ergebnisse würde ich der Einfachheit halber direkt hier mit unterbringen.
              Das sollte nicht so viel sein.
            </p>
            <p>
              Beim Laden der Seite sollte die Buttonbox den Button mit Beschriftung
              "Process" enthalten. Sobald er einmal gedrückt wird, taucht stattdessen
              das "processing" auf. Sobald die Antwort vom Server da ist,
              verschwindet das "processing" und wird wieder durch einen Button
              ersetzt, der jetzt mit Download beschriftet ist (wobei der
              Download-Dialog gleich geöffnet werden sollte). Sobald an den obigen
              Einstellungen etwas verändert wird, geht das Spiel von vorne los ->
              Button zurück auf "Process"…
            </p>
            <p>
              Der Download-Button sollte immer den aktuellsten Stand zur Auswahl liefern.
              Dabei würde ich bei "local files" dann wieder einen Timer setzen, nachdem
              das ganze gelöscht wird und damit neu gebaut werden muss.
            </p>
            <p>
              Ich bin mir nicht sicher, ob man das hier sinnvoll über REST anbieten
              kann. Ggf. kann das erstmal wegbleiben; zumindest muss das erstmal
              noch genauer durchdacht und dann hier entsprechend beschrieben werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import { download } from "@/util";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";

export default {
  name: "customization",
  components: {
    Breadcrumb,
    Loading,
    NotFound
  },
  methods: {
    buttonClick() {
      switch (this.processState) {
        case 0: {
          this.processState++;
          const form = document.getElementById("customizationForm");
          const formData = new FormData(form);
          formData.delete("source");
          formData.delete("customization");
          formData.delete("output");
          this.$store
            .dispatch("triggerCustomization", {
              settingId: this.settingId,
              sourceId: this.sources[this.selectedSource].id,
              customizationId: this.customizations[this.selectedCustomization]
                .id,
              outputFormat: this.outputs[this.selectedOutput].name,
              formData
            })
            .then(downloadable => {
              this.link = downloadable;
              this.processState++;
            })
            .catch(reason => {
              this.log.push(reason);
              this.processState = 0;
            });
          break;
        }
        case 1:
          break;
        case 2:
          if (this.link) {
            download(this.link, false);
          }
          break;
      }
    },
    isLocal(entity) {
      return entity && entity.type && entity.type === "type_client-file";
    }
  },
  data() {
    return {
      processState: 0, // 0 = initial, 1 = processing, 2 = ready for download
      selectedSource: 0,
      selectedCustomization: 0,
      selectedOutput: 0,
      settingId: "mei",
      log: [],
      link: null
    };
  },
  computed: {
    buttonText() {
      switch (this.processState) {
        case 0:
          return "Process";
        case 1:
          return "processing";
        case 2:
          return "Download";
      }
    },
    processing() {
      return this.processState === 1;
    },
    storedCustomizations() {
      const store = this.$store.getters.customizations;
      if (this.settingId in store) {
        return store[this.settingId];
      }
      return {
        customizations: [],
        outputFormats: [],
        sources: []
      };
    },
    customizations() {
      return this.storedCustomizations.customizations;
    },
    sources() {
      return this.storedCustomizations.sources;
    },
    outputs() {
      return this.storedCustomizations.outputFormats;
    },
    customizationVersions() {
      return this.$store.getters.customizationVersions;
    },
    isLoading() {
      return !this.$store.state.customizationsLoaded;
    },
    notFound() {
      const store = this.$store.getters.customizations;
      return !(this.settingId in store);
    }
  },
  watch: {
    selectedSource(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.processState = 0;
      }
    },
    selectedCustomization(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.processState = 0;
      }
    },
    selectedOutput(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.processState = 0;
      }
    }
  }
};
</script>

<style scoped lang="scss">
h2 {
  text-align: left;
  font-size: 1rem;
}

.optionsBox {
  margin: 0 0.2rem;
  background-color: #f5f5f5;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 0.5rem;
  text-align: left;
}

hr {
  border: 0.5px solid #999999;
}

.rest {
  margin: 3rem 0 1rem;
  text-align: left;

  h1 {
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 0.2rem;
  }

  .restURL {
    font-family: "Courier New", "Courier", monospace;
    font-weight: 400;
    font-size: 0.75rem;
    margin: 0 0 1rem;
  }
}

#results {
  margin: 2rem 0 0;

  .columnBox {
    margin: 0 0.2rem;
    background-color: #f5f5f5;
    border: 0.5px solid #999999;
    border-radius: 3px;
    padding: 0.5rem;

    &#btnBox {
      text-align: center;
      padding: 1.5rem 1rem;
    }

    &#logBox {
      text-align: left;
      padding: 0.5rem;
      #logs {
        font-family: "Courier New", "Courier", monospace;
        font-size: 0.7rem;
        max-height: 5rem;
        overflow: auto;
      }
    }
  }
}

.versionInfo {
  margin: 2rem 0 0;

  h1 {
    font-size: 0.9rem;
    text-align: left;
  }

  table {
    font-size: 0.7rem;

    td {
      padding: 0.2em 0.4rem;
    }
  }
}

.internalComment {
  background-color: #ff666666;
  border: 5px solid #ff6666;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}
</style>
