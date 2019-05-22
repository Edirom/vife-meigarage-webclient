<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>MEI Customization Service</h1>
        <p>Select an MEI version and a customization to generate a custom MEI Schema</p>

        <div class="columns">
          <div class="column col-4 col-lg-6 col-md-12">
            <div class="optionsBox">
              <h2>MEI Source</h2>
              <div id="profileRadios" class="form-group">
                <label class="form-radio">
                  <input type="radio" name="source" checked>
                  <i class="form-icon"></i> MEI v4.0.1
                </label>
                <label class="form-radio">
                  <input type="radio" name="source">
                  <i class="form-icon"></i> MEI v3.0.0
                </label>
                <label class="form-radio">
                  <input type="radio" name="source">
                  <i class="form-icon"></i> MEI v2.1.1
                </label>
                <label class="form-radio">
                  <input type="radio" name="source">
                  <i class="form-icon"></i> MEI v2.0.0
                </label>
                <hr/>
                <label class="form-radio">
                  <input type="radio" name="source">
                  <i class="form-icon"></i> Local Source [filePicker]
                </label>
              </div>
            </div>
          </div>

          <div class="column col-4 col-lg-6 col-md-12">
            <div class="optionsBox">
              <h2>Customization</h2>
              <div id="profileRadios" class="form-group">
                <label class="form-radio">
                  <input type="radio" name="customization" checked>
                  <i class="form-icon"></i> MEI All
                </label>
                <label class="form-radio">
                  <input type="radio" name="customization">
                  <i class="form-icon"></i> MEI All anyStart
                </label>
                <label class="form-radio">
                  <input type="radio" name="customization">
                  <i class="form-icon"></i> MEI CMN
                </label>
                <label class="form-radio">
                  <input type="radio" name="customization">
                  <i class="form-icon"></i> MEI Mensural
                </label>
                <label class="form-radio">
                  <input type="radio" name="customization">
                  <i class="form-icon"></i> MEI Neumes
                </label>
                <hr/>
                <label class="form-radio">
                  <input type="radio" name="customization">
                  <i class="form-icon"></i> Local Customization [filePicker]
                </label>
              </div>
            </div>
          </div>
          <div class="column col-4 col-lg-12 col-md-12">
            <div class="optionsBox">
              <h2>Output</h2>
              <div id="profileRadios" class="form-group">
                <label class="form-radio">
                  <input type="radio" name="output" checked>
                  <i class="form-icon"></i> RelaxNG
                </label>
                <label class="form-radio">
                  <input type="radio" name="output">
                  <i class="form-icon"></i> Compiled ODD
                </label>
              </div>
            </div>
          </div>
        </div>

        <div id="results">
          <div class="columns">
            <div class="column col-4">
              <div id="btnBox" class="columnBox">
                <button class="btn btn-primary btn-lg">Process</button>

                <div id="processing">
                  processing
                  <progress class="progress" max="100"></progress>
                </div>
              </div>
            </div>
            <div class="column col-8">
              <div id="logBox" class="columnBox">
                <h2>Logs</h2>
                <div id="logs">
                  May 17 19:55:06 hobbes Console[25877]: DEPRECATED USE in libdispatch client: dispatch source activated with no event handler set; set a breakpoint on _dispatch_bug_deprecated to debug
                  May 17 19:55:07 hobbes diagnosticd[25879]: Posting empty stream filter
                  May 17 19:55:07 hobbes diagnosticd[25879]: no EOS device present
                  May 17 19:55:07 hobbes diagnosticd[25879]: allowing Console (25877) access to stream due to admin status
                  May 17 19:55:07 hobbes diagnosticd[25879]: Posting stream filter: "{
                	    global = 30064771083;
                	}"

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
              <tr>
                <td>Current Development Version</td>
                <td>some date</td>
                <td><a href="https://github.com/music-encoding/music-encoding/commit/482220a54c0dc4da78b1591b99b542649514e618" target="_blank">482220a</a></td>
              </tr>
              <tr>
                <td>MEI 4.0.1</td>
                <td>2019-04-12</td>
                <td><a href="https://github.com/music-encoding/music-encoding/releases/tag/v4.0.1" target="_blank">5e43035</a></td>
              </tr>
              <tr>
                <td>MEI 3.0.0</td>
                <td>2016-06-15</td>
                <td><a href="https://github.com/music-encoding/music-encoding/releases/tag/v3.0.0" target="_blank">86dbcaf</a></td>
              </tr>
              <tr>
                <td>MEI 2.1.1</td>
                <td>2013</td>
                <td><a href="https://github.com/music-encoding/music-encoding/releases/tag/v2.1.1" target="_blank">b9dff53</a></td>
              </tr>
              <tr>
                <td>MEI 2.0.0</td>
                <td>2012</td>
                <td><a href="https://github.com/music-encoding/music-encoding/releases/tag/v3.0.0" target="_blank">1233176</a></td>
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
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "customization",
  components: {
    Breadcrumb
  },
  /*async getInitialData({this.$store, this.$route}) {
    await this.$store.dispatch("fetchOutputs", this.$route.params.inputFormat);
  },*/
  methods: {}
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
