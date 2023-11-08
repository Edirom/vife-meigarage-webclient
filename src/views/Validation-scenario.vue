<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb />
      </div>
      <div class="column col-12">
        <h1>Validation</h1>
        <p>
          Validating files against
          <span class="format">{{ currentValidation.format }}</span> in version
          <span class="version">{{ currentValidation.version }}</span> mit der Customization
          <span class="customization">{{ currentValidation.customization }}</span>
        </p>

        <div class="viewBox">
          <div class="viewBoxInner">
            <h1>File Upload</h1>
            <form
              id="validationForm"
              method="post"
              name="validationForm"
              enctype="multipart/form-data"
            >
              <div id="fileInput">
                <span
                  ><strong id="lang_selectfile">Select file to validate</strong
                  ><br />
                  <br />
                  <input
                    type="file"
                    id="fileToValidate"
                    name="fileToValidate"
                  /><br />
                  <br />
                </span>
              </div>
            </form>
            <button type="button" v-on:click="validate" class="btn btn-primary">
              Validate
            </button>
          </div>
        </div>

        <div class="static">
          <h1>Static Validation</h1>
          <p>
            You may add the following lines to your local files to validate
            against this schema. This requires an active internet connection.
          </p>
          <div class="validationURL">
            &lt;?xml-model
            href="https://www.music-encoding.org/schema/current/mei-all.rng"
            type="application/xml"
            schematypens="http://relaxng.org/ns/structure/1.0"?&gt;<br />
            &lt;?xml-model
            href="http://www.music-encoding.org/schema/current/mei-all.rng"
            type="application/xml"
            schematypens="http://purl.oclc.org/dsdl/schematron"?&gt;
          </div>
        </div>

        <div class="rest">
          <h1>REST</h1>
          <p>
            This validation is available as a RESTful API. Please use the
            following POST for the current validation:
          </p>
          <div class="restURL">
            {{ currentValidation.href }}
          </div>
          <p>
            <a onclick="alert('Link zur Swagger-Dokumentation')"
              >API Documentation</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { responseToDownloadable, download } from "@/util";
import axios from "axios";
//import notFound from "@/components/NotFound.vue";
//import Loading from "@/components/Loading.vue";

const store = useStore();

const props = defineProps({
  id: { type: String },
});

//delete if a current validation does not need to be remembered between routes
onMounted(() => {
  console.log(props.id);
  store.commit("SET_CURRENT_VALIDATION", props.id);
});

const currentValidation = computed(() => {
  return store.state.validations[props.id];
});

function validate() {
  let myForm = document.getElementById("validationForm");
  let formData = new FormData(myForm);
  // we require the file to be present
  const file = formData.get("fileToValidate");
  if (!file || file.size === 0) {
    return;
  }

  axios
    .post(currentValidation.value.href, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob",
    })
    .then(function (response) {
      download(responseToDownloadable(response));
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

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
