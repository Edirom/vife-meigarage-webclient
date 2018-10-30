<template>
  <div>{{fetchOutputs($route.params.inputFormat)}}
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>Choose an output format</h1>
        <div class="viewBox">
          <div class="viewBoxInner">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>name</th>
                  <th>info</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="inputFormats" ref="container">
                <ConversionOutputItem v-for="output in outputs" :id="output.id" :label="output.label"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import ConversionOutputItem from "@/components/ConversionOutputItem.vue";

export default {
  name: "conversion-outputSelection",
  components: {
    Breadcrumb,
    ConversionOutputItem
  },
  /*methods: {
    fetchInputs: function() {
      this.$store.dispatch("fetchInputs");
    }
  },*/
  methods: {
    fetchOutputs: function(id) {
      console.log('trying to fetch outputs… for ' + id)
      console.log(typeof this.outputs)
      this.$store.dispatch("fetchOutputs",{id});
    }
  },
  computed: {
    outputs: function() {
      //console.log($route.params)
      //this.fetchOutputs();
      return Array.from(this.$store.state.inputs.values())
    }
  }
};
</script>

<style scoped lang="scss">
  .viewBox {
    background-color: #f5f5f5;
    border: .5px solid #999999;
    border-radius: 3px;
    padding: 2rem;
  }

  .viewBoxInner {
    background-color: #ffffff;
    padding: 1rem;
  }
</style>
