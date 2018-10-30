<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>musicxml2mei</h1>
        <p>Convert MusicXML files to MEI</p>
        <div class="viewBox">
          <div class="viewBoxInner">
            <h1>Options</h1>
            <p>
              trololo
            </p>
            <h1>File Upload</h1>
            <button class="btn btn-primary">Convert</button>
          </div>
        </div>
      </div>
    </div>  
  </div> 
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "conversion-options",
  components: {
    Breadcrumb
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