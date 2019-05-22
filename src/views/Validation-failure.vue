<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>Validation</h1>
        <p>Validating <span class="filename">FILENAME</span> against <span class="format">{{format}}</span>
          in version <span class="version">{{version}}</span></p>

          <div class="viewBox">
            <div class="viewBoxInner">
              <h1>Failure</h1>
              <i class="icon icon-4x icon-cross"></i>
              <p>Your file is not valid.</p>
            </div>
          </div>

          <div class="resultsBox">
            <h1>Detailed Validation Results</h1>
            <div class="columns">
              <div class="column col-6">
                <h2>Errors (<span id="errorCount">14</span>)</h2>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>message</th>
                      <th>line</th>
                    </tr>
                  </thead>
                  <tbody id="errors">
                    <tr>
                      <td>element "blub" not allowed anywhere; expected the…</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>element "blub" not allowed anywhere; expected the…</td>
                      <td>14</td>
                    </tr>
                    <tr>
                      <td>element "blub" not allowed anywhere; expected the…</td>
                      <td>110</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="column col-6">
                <h2>Warnings (<span id="warningCount">7</span>)</h2>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>message</th>
                      <th>line</th>
                    </tr>
                  </thead>
                  <tbody id="warnings">
                    <tr>
                      <td>element "blub" not allowed anywhere; expected the…</td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <p class="additionalInfo">
            This results page will be available for
            <span id="remainingTime">two hours</span>. After that, you will be
            redirected to the options page, and we will delete your uploaded file
            from our servers automatically.
          </p>

          <div class="internalComment">
            <h1>Interne Hinweise</h1>
            <p>
              Solange wir nicht wissen, in welcher Form die
              Validierungsergebnisse zurückkommen, ist es auch ziemlich schwierig,
              hier eine Ergebnisseite zu basteln. Das ganze ist also noch
              ziemlich flexibel…
            </p>
            <p>
              Ich bin noch unsicher, ob wir auch eine Seite brauchen, falls es nur
              Warnungen, aber keine Fehlermeldungen gibt. Das tritt eigentlich nur
              bei Schematron auf, und dürfte etwas verwirrend sein. Mein Vorschlag
              für den ersten Anlauf der Garage wäre also, das hier auf der
              Fehlerseite abzuhandeln. Wenn jemand gewillt ist, Warnungen zu
              akzeptieren, wird er das Ergebnis auch interpretieren können…
            </p>
            <p>Siehe auch die Hinweise auf der Seite Validation-success.vue</p>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "validation-failure",
  components: {
    Breadcrumb
  },
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
.filename,
.format,
.version {
  font-size: 1.2rem;
  font-weight: 700;
}

.viewBox {
  background-color: #f55f2e;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 2rem;
}

.viewBoxInner {
  background-color: #ffffff;
  padding: 1rem;

  p {
    margin: 1rem 0 0;
  }
}

.resultsBox {
  margin: 3rem 0;

  h2 {
    font-size: 1.1rem;
    text-align: left;
    margin: 0;
  }

  td + td {
    text-align: right;
  }
}

.additionalInfo {
  margin: 2rem 0;
  text-align: left;
}

#remainingTime {
  font-size: 1rem;
  font-weight: 700;
}

.internalComment {
  background-color: #ff666666;
  border: 5px solid #ff6666;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}
</style>
