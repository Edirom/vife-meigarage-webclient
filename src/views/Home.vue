<template>
  <div class="columns">
  
    <div class="column col-12">
      <h1>MEIGarage</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
        mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa 
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, 
        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. 
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. 
      </p>
    </div>
  
    <div class="column col-4 col-md-6 col-xs-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">Validation</div>
          <div class="card-subtitle text-gray">Validate files</div>
        </div>
        <div class="card-body">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Common validation scenarios:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Validate MEI 3.0.0</td>
              </tr>
              <tr>
                <td>Validate MEI 4.0.0</td>
              </tr>
              <tr>
                <td>Validate MusicXML 3.1</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/about" class="btn btn-sm float-right seeAllButton">See all</router-link>
        </div>
      </div>
    </div>
    
    <div class="column col-4 col-md-6 col-xs-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">Conversion</div>
          <div class="card-subtitle text-gray">Convert between formats</div>
        </div>
        <div class="card-body">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Common file conversions:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><router-link to="/conversions/input">MusicXML to MEI</router-link></td>
              </tr>
              <tr>
                <td>MEI to PDF</td>
              </tr>
              <tr>
                <td>MEI to Audio</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/conversions" class="btn btn-sm float-right seeAllButton">See all</router-link>
        </div>
      </div>
    </div>
    
    <div class="column col-4 col-md-6 col-xs-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">Data Configuration</div>
          <div class="card-subtitle text-gray">Set data profiles</div>
        </div>
        <div class="card-body">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Common data configurations:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adjust MEI Controlevents</td>
              </tr>
              <tr>
                <td>Add timestamps</td>
              </tr>
              <tr>
                <td>Add IDs</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/about" class="btn btn-sm float-right seeAllButton">See all</router-link>
        </div>
      </div>
    </div>
    
  </div>
  
  
  <!--<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to the MEI Garage"/>
  </div>-->
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    } 
  }
};
</script>

<style lang="scss">
  .seeAllButton {
    margin-top: .5rem;
  }
</style>
