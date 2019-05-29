<template>
  <div class="columns">

    <div class="column col-12">
      <h1><img id="largeLogo" alt="MEI Garage" src="../assets/meigarage.logo.png"></h1>
      <p>
        Welcome to the MEI Garage. Please select a task you would like to accomplish.
      </p>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
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
              <td><router-link to="/conversions/mei21/mei30">MEI 2.1 to MEI 3.0</router-link></td>
            </tr>
              <tr>
                <td><router-link to="/conversions/musicxml/mei30">MusicXML to MEI</router-link></td>
              </tr>
              <tr>
                <td>MEI to PDF (coming soon)</td>
              </tr>
              <!--<tr>
                <td>MEI to Audio (coming soon)</td>
              </tr>-->
            </tbody>
          </table>
          <router-link to="/conversions" class="btn btn-sm float-right seeAllButton">See all</router-link>
        </div>
      </div>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">Customization</div>
          <div class="card-subtitle text-gray">Customize the MEI Schema</div>
        </div>
        <div class="card-body">
          <table class="table table-striped table-hover">
            <thead>
            <tr>
              <th>Common customizations:</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td><router-link to="/customization">MEI Customization Service</router-link></td>
              </tr>
            <tr>
              <td><a href="/profileDrafter.html" target="_blank">MEI ProfileDrafter</a> (helps to restrict MEI)</td>
            </tr>
            <tr>
              <td><a href="https://music-encoding.org/archive/comparison-4.0.html" target="_blank">MEI Comparison</a> (compares MEI 4.0 with MEI 3.0)</td>
            </tr>
            </tbody>
          </table>
          <router-link to="/customization" class="btn btn-sm float-right seeAllButton">Customize MEI</router-link>
        </div>
      </div>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12 cardBg">
      <div class="card" id="validationCard">
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
                <td>Validate MEI 4.0.1</td>
              </tr>
              <tr>
                <td>Validate MusicXML 3.1</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/validation" class="btn btn-sm float-right seeAllButton">See all</router-link>
        </div>
      </div>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12 cardBg">
      <div class="card" id="configurationCard">
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
          <router-link to="/configuration" class="btn btn-sm float-right seeAllButton">See all</router-link>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {
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

  .column {
    margin-top: .5rem;
    margin-bottom: .5rem;
  }

  #largeLogo {
    width: 16rem;
  }

  .cardBg {
    position: relative;
    overflow: hidden;
  }

  #validationCard, #configurationCard {
    &:before {
      font-weight: 700;
      content: 'coming soon';
      text-align: center;
      width: 150%;
      position: absolute;
      top: 36%;
      left: -25%;
      transform-origin: center;
      transform: rotate(-30deg);
      padding: 1.5rem;
      color: red;
      background-color: rgba(240,210,210,.7);
      border: 1px solid red;
    }
  }
</style>
