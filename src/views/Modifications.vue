<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb />
      </div>
      <div class="column col-12">
        <h1>Data Configuration</h1>
        <p>Transform your MEI files per XSLT</p>

        <div class="columns">
          <div class="column col-4">
            <div class="columnBox">
              <h2>Input</h2>
              <form
                id="validationForm"
                method="post"
                name="uploadForm"
                enctype="multipart/form-data"
              >
                <div id="fileInput">
                  <input
                    type="file"
                    id="fileToTransform"
                    name="fileToTransform"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="column col-4">
            <div class="columnBox">
              <h2>Available Transformations</h2>

              <div class="transform tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Add IDs</div>
                  <small class="tile-subtitle text-gray"
                    >Ensures UUID-based @xml:id</small
                  >
                </div>
                <div class="tile-action">
                  <button class="btn btn-link">
                    <i class="icon icon-menu"></i>
                  </button>
                </div>
              </div>

              <div class="transform tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Add Timestamps</div>
                  <small class="tile-subtitle text-gray"
                    >Inserts timestamps for all events</small
                  >
                </div>
                <div class="tile-action">
                  <button class="btn btn-link">
                    <i class="icon icon-menu"></i>
                  </button>
                </div>
              </div>

              <div class="transform tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Adjust Controlevents</div>
                  <small class="tile-subtitle text-gray"
                    >Allows consistent Controlevent linking</small
                  >
                </div>
                <div class="tile-action">
                  <button class="btn btn-link">
                    <i class="icon icon-menu"></i>
                  </button>
                </div>
              </div>

              <div class="transform tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Resolve Shortcuts</div>
                  <small class="tile-subtitle text-gray"
                    >Fills in abbreviated texts</small
                  >
                </div>
                <div class="tile-action">
                  <button class="btn btn-link">
                    <i class="icon icon-menu"></i>
                  </button>
                </div>
              </div>

              <div class="transform tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Flatten Apps</div>
                  <small class="tile-subtitle text-gray"
                    >Simplifies file by selecting &lt;rdg&gt;</small
                  >
                </div>
                <div class="tile-action">
                  <button class="btn btn-link">
                    <i class="icon icon-menu"></i>
                  </button>
                </div>
              </div>

              <div class="transform tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Flatten Choices</div>
                  <small class="tile-subtitle text-gray"
                    >Simplifies file by resolving &lt;choice&gt;</small
                  >
                </div>
                <div class="tile-action">
                  <button class="btn btn-link">
                    <i class="icon icon-menu"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="column col-4">
            <div class="columnBox">
              <h2>Settings</h2>
            </div>
          </div>
        </div>

        <div class="rest">
          <h1>REST</h1>
          <p>
            This data configuration service is available through a RESTful API.
            Please use the following POST:
          </p>
          <div class="restURL">
            https://meigarage.edirom.de/rest/validation/mei/4.0.1/mei-all/tralala
          </div>
          <p>
            <a onclick="alert('Link zur Swagger-Dokumentation')"
              >API Documentation</a
            >
          </p>
        </div>

        <!-- <div class="internalComment">
          <h1>Interne Hinweise zur Umsetzung</h1>
          <p>
            Die Seite hier ist noch ziemlicher Käse – da müssen wir erst noch
            genauer überlegen, wie das eigentlich gehen soll. Ich hatte mal über
            Drag&amp;Drop einzelner Schritte in einen Arbeitsbereich
            nachgedacht, aber wir müssen dort ja auch bestimmte Reihenfolgen
            einhalten, bzw. manche Abhängigkeiten erfordern dann zusätzliche
            XSLT. Außerdem muss es noch für viele der XSLT die Möglichkeit
            geben, Parameter zu spezifizieren (dafür war jeweils das
            Hamburger-Menü angedacht). Lasst uns mal erstmal nochmal sprechen,
            bevor wir hier irgendwas umsetzen…
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "configuration",
  components: {
    Breadcrumb,
  },
  /*async getInitialData({this.$store, this.$route}) {
    await this.$store.dispatch("fetchOutputs", this.$route.params.inputFormat);
  },*/
  methods: {},
};
</script>

<style scoped lang="scss">
.columnBox {
  text-align: left;

  h2 {
    font-size: 1rem;
  }
}

.transform {
  background-color: #f5f5f5;
  margin: 0 0 0.5rem;
  padding-left: 0.5rem;
  border-radius: 0.3rem;
  border: 0.5px solid #999999;

  .btn.btn-link {
    color: #666666;
  }
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

.internalComment {
  background-color: #ff666666;
  border: 5px solid #ff6666;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}
</style>
