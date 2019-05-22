<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>Validation</h1>
        <p>Validating files against <span class="format">{{format}}</span>
          in version <span class="version">{{version}}</span></p>

        <div class="viewBox">
          <div class="viewBoxInner">
            <h1>File Upload</h1>
            <form id="validationForm" method="post" name="validationForm" enctype="multipart/form-data">
              <div id="fileInput">
				        <span><strong id="lang_selectfile">Select file to validate</strong><br>
                  <br>
				          <input type="file" id="fileToValidate" name="fileToValidate"><br>
                  <br>
                </span>
              </div>
            </form>
            <button class="btn btn-primary">Validate</button>
          </div>
        </div>
        <div class="parameterBox">
          <h1><i class="icon icon-caret"></i>Validation Options</h1>
          <div class="columns">
            <div class="column col-6">

              <div class="optionsBox profiles">
                <h2>Available Profiles</h2>
                <div id="profileRadios" class="form-group">
                  <label class="form-radio">
                    <input type="radio" name="profile" checked>
                    <i class="form-icon"></i> MEI All
                  </label>
                  <label class="form-radio">
                    <input type="radio" name="profile">
                    <i class="form-icon"></i> MEI anyStart
                  </label>
                  <label class="form-radio">
                    <input type="radio" name="profile">
                    <i class="form-icon"></i> MEI CMN
                  </label>
                  <label class="form-radio">
                    <input type="radio" name="profile">
                    <i class="form-icon"></i> MEI Mensural
                  </label>
                  <label class="form-radio">
                    <input type="radio" name="profile">
                    <i class="form-icon"></i> MEI Neumes
                  </label>
                </div>
              </div>

            </div>
            <div class="column col-6">

              <div class="optionsBox schematron">
                <h2>Schematron</h2>
                <div class="form-group">
                  <label class="form-checkbox">
                    <input type="checkbox" checked>
                    <i class="form-icon"></i> Validate Schematron Rules
                  </label>
                </div>
              </div>


            </div>
          </div>

        </div>

        <div class="static">
          <h1>Static Validation</h1>
          <p>You may add the following lines to your local files to validate against this schema.
            This requires an active internet connection.</p>
            <div class="validationURL">
              &lt;?xml-model href="https://www.music-encoding.org/schema/current/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?&gt;<br/>
              &lt;?xml-model href="http://www.music-encoding.org/schema/current/mei-all.rng" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?&gt;
            </div>
        </div>

        <div class="rest">
          <h1>REST</h1>
          <p>This validation is available as a RESTful API. Please use the
            following POST for the current validation:</p>
            <div class="restURL">https://meigarage.edirom.de/rest/validation/mei/4.0.1/mei-all/tralala</div>
          <p><a onclick="alert('Link zur Swagger-Dokumentation')">API Documentation</a></p>
        </div>

        <div class="internalComment">
          <h1>Interne Hinweise zur Umsetzung</h1>
          <p>
            Aktuell werden für format und version nur die direkten Strings
            ausgegeben. Hier wäre es sinnvoll, da auch entsprechende Objekte im
            store zu hinterlegen und dann etwas vollständiger zu sein (also "MEI"
            statt "mei", "MusicXML" statt "musicxml" etc.). Aus diesem Objekt
            sollten dann auch die verfügbaren Profile und zugehörigen URLs kommen.
            Daniel, das klingt nach Kommunikation mit dem Backend ;-)
          </p>
          <p>
            Der Breadcrumb vereint Format und Version, in der URL sind es aber
            zwei getrennte Routes. Wenn jemand nur auf das Format geht
            ("/validation/mei") sollte er automatisch zum "latest" bzw. "current"
            weitergeleitet werden.
          </p>
          <p>
            Wenn es zu einem Format mehrere Profile gibt, sollte oben in der Überschrift
            nicht {format} stehen, sondern das jeweils aktuelle Profil. Das könnte
            auch verlinkt sein und bei einem Klick nach unten zu den Profilen führen.
            Bei MusicXML gibt es keine Profile, so dass dort einfach {format}
            hinkommt.
          </p>
          <p>
            Validation Options soll offensichtlich einklappbar sein.
          </p>
          <p>
            Offensichtlich muss das Format der REST-Anfrage noch spezifiziert werden ;-)
          </p>
          <p>
            Unten sind zwei Beispielseiten verlinkt, wie das Ergebnis der Validierung
            aussehen sollte. Mein Vorschlag wäre, pro Validierung eine UUID zu generieren
            und die an die URL dranzuhängen. Unter der URL könnte das Ergebnis
            für eine voreingestellte Zeit verfügbar sein, danach wird es
            automatisch gelöscht.
          </p>
          <router-link to="/validation/mei/4.0.1/47edf1ec-bc4e-46bd-8be3-292fc270d8f7">
            <button style="margin-right: .25rem;" class="btn btn-lg btn-success">Valides Beispiel</button>
          </router-link>

          <router-link to="/validation/mei/4.0.1/50ea0681-85dd-4242-995f-c8008ed04917">
            <button style="margin-left: .25rem;" class="btn btn-lg btn-error">Nicht-valides Beispiel</button>
          </router-link>
          <p style="margin-top: 1rem;">Ich bin nicht sicher, ob wir den Bereich "Static Validation"
            brauchen. Es ist aber vielleicht ein netter Service, wenn wir's
            gleich dazuschreiben?</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "validation-secnario",
  components: {
    Breadcrumb
  },
  /*async getInitialData({this.$store, this.$route}) {
    await this.$store.dispatch("fetchOutputs", this.$route.params.inputFormat);
  },*/
  methods: {},
  computed: {
    format() {
      return this.$route.params.format;
    },

    version() {
      return this.$route.params.version;
    }
  }
};
</script>

<style scoped lang="scss">
.format,
.version {
  font-size: 1.2rem;
  font-weight: 700;
}

.viewBox {
  background-color: #f5f5f5;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 2rem;
}

.viewBoxInner {
  background-color: #ffffff;
  padding: 1rem;
}

.parameterBox {
  margin: 2rem 0;
  background-color: #e5e5e5;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 0.5rem;

  h1 {
    text-align: left;
    font-size: 1.2rem;
  }

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
}

.rest,
.static {
  margin: 3rem 0 1rem;
  text-align: left;

  h1 {
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 0.2rem;
  }

  .validationURL {
    font-family: "Courier New", "Courier", monospace;
    font-weight: 400;
    font-size: 0.75rem;
    margin: 0;
  }

  .restURL {
    font-family: "Courier New", "Courier", monospace;
    font-weight: 400;
    font-size: 0.75rem;
    margin: 0 0 1rem;
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
