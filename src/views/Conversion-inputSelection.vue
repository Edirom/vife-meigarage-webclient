<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>Choose an input format</h1>
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
                <!--<tr>
                  <td><router-link to="/conversions/mei">MEI</router-link></td>
                  <td></td>
                  <td><i class="icon icon-forward"></i></td>
                </tr>-->
                <ConversionInputItem v-for="input in inputs" v-bind="input" :id="input.id" :label="input.label"/>
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
import ConversionInputItem from "@/components/ConversionInputItem.vue";

export default {
  name: "conversion-inputSelection",
  components: {
    Breadcrumb,
    ConversionInputItem
  },/* 
  methods: {
    fetchInputs: function() {
      this.$store.dispatch("fetchInputs");
    }
  },*/
  computed: {
    inputs () {
      let mapValues = this.$store.state.inputs.values();
      return Array.from(mapValues)
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