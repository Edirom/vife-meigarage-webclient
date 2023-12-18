<template>
  <div>
    <div v-if="isLoading">
      <loading></loading>
    </div>
    <div v-else>
      <not-found v-if="notFound">
        <router-link to="/conversions">Back to conversions</router-link>
      </not-found>
      <form
        v-else
        id="conversionForm"
        method="post"
        name="conversionForm"
        enctype="multipart/form-data"
      >
        <div class="columns">
          <div class="column col-12">
            <Breadcrumb />
          </div>
          <div class="column col-12">
            <h1>
              {{ this.$route.params.inputFormat }} to
              {{ this.$route.params.outputFormat }}
            </h1>
            <p>Convert {{ input }} files to {{ output }}</p>
            <div class="viewBox">
              <div class="viewBoxInner">
                <h1>File Upload</h1>
                <div id="fileInput">
                  <span
                    ><strong id="lang_selectfile">Select file to convert</strong
                    ><br />
                    <br />
                    <input
                      type="file"
                      id="fileToConvert"
                      name="fileToConvert"
                    /><br />
                    <br />
                  </span>
                </div>
                <button
                  type="button"
                  v-on:click="convert"
                  class="btn btn-primary"
                >
                  Convert
                </button>
                <div v-if="loading" class="loading loading-lg" />
              </div>
            </div>
            <div class="parameterBox" v-if="hasParameters">
              <h1>
                <i class="icon icon-caret"></i>Conversion Steps and Parameters
              </h1>
              <div class="parametersList">
                <ConversionStep
                  v-for="step in steps"
                  :step="step"
                  :label="step.label"
                  :id="step.id"
                  :key="step.id"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import axios from "axios";
import ConversionStep from "@/components/ConversionStep.vue";
import { responseToDownloadable, download } from "@/util";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";
//import { useStore } from "vuex";

//const store = useStore();

export default {
  name: "conversion-options",
  components: {
    Loading,
    NotFound,
    Breadcrumb,
    ConversionStep,
  },
  /*async getInitialData({this.$store, this.$route}) {
    await this.$store.dispatch("fetchOutputs", this.$route.params.inputFormat);
  },*/
  methods: {
    convert: function () {
      let myForm = document.getElementById("conversionForm");
      let formData = new FormData(myForm);
      let store = this.$store;
      // we require the file to be present
      const file = formData.get("fileToConvert");
      if (!file || file.size === 0) {
        return;
      }
      // unsure if directly committing values to the store is clean
      // also use of axios here is a side effect
      // same would be the case for validation-scenario
      store.commit("SET_CONVERSION_ONGOING", true);
      axios
        .post(this.href, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        })
        .then(function (response) {
          download(responseToDownloadable(response));
          store.commit("SET_CONVERSION_ONGOING", false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          store.commit("SET_CONVERSION_ONGOING", false);
        });
    },
  },
  computed: {
    input() {
      const input = this.$store.getters.input(this.$route.params.inputFormat);
      if (!input) {
        return "";
      }
      return input.label;
    },
    output() {
      for (let output of this.$store.getters.outputs(
        this.$route.params.inputFormat
      )) {
        if (output.id === this.$route.params.outputFormat) return output.label;
      }
      return "Unknown";
    },
    steps() {
      for (let output of this.$store.getters.outputs(
        this.$route.params.inputFormat
      )) {
        if (output.id === this.$route.params.outputFormat) return output.steps;
      }
      return [];
    },
    href() {
      for (let output of this.$store.getters.outputs(
        this.$route.params.inputFormat
      )) {
        if (output.id === this.$route.params.outputFormat) return output.href;
      }
      return "#";
    },
    hasParameters() {
      // backend gives us non-sense values, we know we do not have any so return false
      // return false;

      const steps = this.steps;
      for (const step of steps) {
        //  && !(step.parameters.length === 1 && step.parameters[0].id === 'de.edirom.meigarage.mei.profileNames')
        if (step && step.parameters && step.parameters.length > 0) {
          return true;
        }
      }
      return false;
    },
    isLoading() {
      return !this.$store.state.inputsLoaded;
    },
    loading() {
      return this.$store.state.conversionOngoing;
    },
    notFound() {
      for (const output of this.$store.getters.outputs(
        this.$route.params.inputFormat
      )) {
        if (output.id === this.$route.params.outputFormat) return false;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
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
}
</style>
